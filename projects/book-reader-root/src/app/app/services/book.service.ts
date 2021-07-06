import { Injectable } from '@angular/core';
import { IDBName } from 'projects/book-reader-root/src/environments/environment';
import { IDBService } from 'projects/indexed-db/src/public-api';
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

  async listBooks(): Promise<string[]> {
    const bookDB = await this.idbService.openIDB(IDBName.books)
    const stores = bookDB.objectStoreNames
    const bookNames: string[] = []
    for (let i = 0; i < stores.length; i++) {
      bookNames.push(stores.item(i) as string)
    }
    return bookNames
  }

  async createBook(bookName: string): Promise<void> {
    const idb = await this.idbService.upgradeIDB(IDBName.books)
    if (idb.objectStoreNames.contains(bookName)) {
      throw `Book[${bookName}] has been created`
    }
    const store = idb.createObjectStore(bookName, {
      keyPath: "title"
    })
  }

  async openBook(bookName: string, mode?: IDBTransactionMode): Promise<IDBObjectStore> {
    const idb = await this.idbService.openIDB(IDBName.books)
    if (idb.objectStoreNames.contains(bookName)) {
      return idb.transaction(bookName, mode).objectStore(bookName)
    }
    await this.createBook(bookName)
    return this.openBook(bookName, mode)
  }

  async addChapters(bookName: string, chapters: Chapter[]) {
    const store = await this.openBook(bookName, "readwrite")
    chapters.forEach(chapter => store.put(chapter))
  }

  async generateBookFromFile(bookName: string, file: File) {
    if (!file) return;
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = async () => {
        const content = reader.result as string
        const chapters = this.txtResolver.spliteChapter(content)
        this.addChapters(bookName, chapters).then(resolve)
      }
      /**
       * 选择最常用的中文文件编码 GB2312
       * 后期考虑自动检测(自动检测会检测出JS不支持的字符编码格式，导致读取失败)
       */
      reader.readAsText(file, "GB2312")
    })
  }
}
