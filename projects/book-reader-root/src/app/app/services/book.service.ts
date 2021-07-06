import { Injectable } from '@angular/core';
import { IDBName } from 'projects/book-reader-root/src/environments/environment';
import { IDBService } from 'projects/indexed-db/src/public-api';
import { BookInfo } from '../entity/book-info';
import { Chapter } from '../entity/chapter';
import { TxtResolverService } from './txt-resolver.service';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(
    private idbService: IDBService,
    private txtResolver: TxtResolverService
  ) {
    /**
     * 初始化数据库
     * 创建Book本地数据库
     */
    this.idbService.openIDB(IDBName.books)
  }

  /**
   * 获取所有书籍名称列表
   * @returns 书籍名称列表
   */
  async listBooks(): Promise<string[]> {
    const bookDB = await this.idbService.openIDB(IDBName.books)
    const stores = bookDB.objectStoreNames
    const bookNames: string[] = []
    for (let i = 0; i < stores.length; i++) {
      bookNames.push(stores.item(i) as string)
    }
    return bookNames
  }

  /**
   * 初始化书籍信息
   * @param bookName 书籍名称
   * @returns 书籍信息
   */
  private async initBookInfo(bookName: string) {
    const idb = await this.idbService.openIDB(IDBName.books)
    const store = idb.transaction(bookName, "readwrite").objectStore(bookName)
    const bookInfo = new BookInfo(bookName)
    return new Promise((resolve, reject) => {
      const addRequest = store.add(bookInfo, IDBName.bookInfo)
      addRequest.onerror = reject
      addRequest.onsuccess = resolve
    })
  }

  /**
   * 创建书籍，并自动初始化书籍信息
   * @param bookName 书籍名称
   */
  async createBook(bookName: string): Promise<void> {
    const idb = await this.idbService.upgradeIDB(IDBName.books)
    const store = idb.createObjectStore(bookName, {
      autoIncrement: true
    })
    store.createIndex("title", "title", { unique: true })
    this.initBookInfo(bookName)
  }

  /**
   * 判断是否包含某本书
   * @param bookName 书籍名称
   * @returns 是否包含
   */
  async includeBook(bookName:string):Promise<boolean>{
    const idb = await this.idbService.openIDB(IDBName.books)
    return idb.objectStoreNames.contains(bookName)
  }

  /**
   * 以指定模式打开书籍事务
   * @param bookName 书籍名称
   * @param mode 模式 默认只读
   * @returns 该书籍相关事务
   */
  async openBook(bookName: string, mode?: IDBTransactionMode): Promise<IDBObjectStore> {
    const includeBookFlag = await this.includeBook(bookName)
    if(!includeBookFlag)await this.createBook(bookName)
    const idb = await this.idbService.openIDB(IDBName.books)
    return idb.transaction(bookName, mode).objectStore(bookName)
  }

  /**
   * 为某书籍添加/更新章
   * @param bookName 书籍名称
   * @param chapters 章数组
   */
  async addChapters(bookName: string, chapters: Chapter[]) {
    const store = await this.openBook(bookName, "readwrite")
    chapters.forEach(chapter => store.put(chapter))
  }

  /**
   * 通过本地文件生成书籍
   * @param bookName 书籍名称
   * @param file 书籍文件
   * @returns null
   */
  async generateBookFromFile(bookName: string, file: File): Promise<void> {
    if (!file) return;
    return new Promise(async (resolve, reject) => {
      const reader = new FileReader()
      reader.onload = async () => {
        const content = reader.result as string
        const chapters = this.txtResolver.spliteChapter(content)
        console.log(chapters)
        this.addChapters(bookName, chapters)
          .then(resolve)
          .catch(reject)
      }
      /**
       * 选择最常用的中文文件编码 GB2312
       * 后期考虑自动检测(自动检测会检测出JS不支持的字符编码格式，导致读取失败)
       */
      reader.readAsText(file, "GB2312")
    })
  }

  /**
   * 从书籍中加载某章
   * @param bookName 书籍名称
   * @param chapterName 章节名称
   * @returns 章节对象
   */
  async loadFromBook(bookName: string, chapterName: string): Promise<Chapter> {
    return new Promise(async (resolve, reject) => {
      const store = await this.openBook(bookName)
      const getRequest = store.get(chapterName)
      getRequest.onerror = function (event) {
        console.log(`load from Book[${bookName}]`, event)
        reject(event)
      }
      getRequest.onsuccess = function (event) {
        resolve(this.result as Chapter)
      }
    })
  }

  /**
   * 获取书籍信息
   * @param bookName 书籍名称 
   * @returns 书籍信息
   */
  async getBookInfo(bookName: string) {
    return this.loadFromBook(bookName, IDBName.bookInfo)
  }
}
