import { Injectable } from '@angular/core';
import { IDBService } from 'projects/indexed-db/src/public-api';
import { IDB } from "projects/book-reader-root/src/environments/environment"
import { Book } from '../entity/book';
import { Chapter } from '../entity/chapter';

const {
  name: IDBBookReaderName,
  Book: IDBBookReaderBook
} = IDB.BookReader
const {
  name: IDBBookReaderBookName,
  pkey: IDBBookReaderBookPKey,
  keys: IDBBookReaderBookKeys
} = IDBBookReaderBook
const NullFn = () => { }
type BookCacheMap = {
  [name:string]:Book
}

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private bookCache:BookCacheMap = {}
  constructor(
    private idbService: IDBService
  ) {}

  /** 打开BookReader数据库
   * @returns IDBDatabase
   */
  private async openIDBBookReader(): Promise<IDBDatabase> {
    return this.idbService.openIDB(IDBBookReaderName)
  }

  /** 更新BookReader数据库
   * @returns IDBDatabase
   */
  private async upgradeIDBBookReader(): Promise<IDBDatabase> {
    return this.idbService.upgradeIDB(IDBBookReaderName)
  }
  /** 打开BookReader数据库Book数据文档
   * @param mode 打开模式
   * @returns 事务模式下IDBObjectStore套接字
   */
  private async openIDBBookReaderBookStore(mode?: IDBTransactionMode | undefined): Promise<IDBObjectStore> {
    const idb = await this.openIDBBookReader()
    if (idb.objectStoreNames.contains(IDBBookReaderBookName)) {
      return idb.transaction(IDBBookReaderBookName, mode).objectStore(IDBBookReaderBookName)
    }
    // console.log(idb)
    const upgradeIdb = await this.upgradeIDBBookReader()
    // console.log(upgradeIdb)
    const store = upgradeIdb.createObjectStore(IDBBookReaderBookName, { keyPath: IDBBookReaderBookPKey })
    // IDBBookReaderBookKeys.forEach(key=>store.createIndex(key.name,key.name,key.options))
    // upgradeIdb.close()
    return this.openIDBBookReaderBookStore(mode)

  }

  /** 将IDBRequest转换为Promise
   * @param request IDBRequest
   * @returns Promise
   */
  private async convertPromise<T = any, R = any>(
    request: IDBRequest<T>,
    convertor: (result: T) => R = result => result as any
  ) {
    return new Promise<R>((resolve, reject) => {
      request.onsuccess = function (ev) {
        const result = this.result
        const convertedResult = convertor(result)
        resolve(convertedResult)
      }
      request.onerror = function (ev) {
        reject(ev)
      }
    })
  }

  /** 列出书籍名称列表
   * @returns 书籍名称列表
   */
  async listBookNames(): Promise<string[]> {
    const store = await this.openIDBBookReaderBookStore()
    const getAllKeysRequest = store.getAllKeys()
    return this.convertPromise(getAllKeysRequest, keys => keys as string[])
  }

  /** 创建书籍
   * @param book 书籍信息
   */
  async createBook(book: Book): Promise<void> {
    const store = await this.openIDBBookReaderBookStore("readwrite")
    const getAllKeysRequest = store.getAllKeys(book.name)
    const bookNameList = await this.convertPromise<IDBValidKey[],string[]>(getAllKeysRequest)
    if(bookNameList.includes(book.name))return;
    const request = store.add(book)
    return this.convertPromise<IDBValidKey, void>(request, NullFn)
  }

  /** 更新书籍
   * @param book 书籍信息 
   */
  async updateBook(book: Book,bookName?:string): Promise<void> {
    const store = await this.openIDBBookReaderBookStore("readwrite")
    const request = store.put(book,bookName)
    await this.convertPromise<IDBValidKey, void>(request, NullFn)
    if(!!bookName)delete this.bookCache[bookName]
    this.bookCache[book.name] = book
  }

  /** 删除书籍
   * @param bookName 书籍名称
   */
  async deleteBook(bookName: string): Promise<void> {
    const store = await this.openIDBBookReaderBookStore("readwrite")
    const request = store.delete(bookName)
    await this.convertPromise<undefined, void>(request, NullFn)
    delete this.bookCache[bookName]
  }

  /** 打开书籍
   * @param bookName 书籍名称 
   * @returns 书籍
   */
  async openBook(bookName: string): Promise<Book> {
    const store = await this.openIDBBookReaderBookStore()
    const request = store.get(bookName)
    const book = await this.convertPromise<any, Book>(request)
    if(!!book)this.bookCache[book.name] = book
    return book
  }

  /** 更新章节
   * @param book 章节所属书本 
   * @param newChapter 更改后的章节
   * @param chapterName 章节名称（可选）
   */
  async updateChapter(book:Book,newChapter:Chapter,chapterName:string = newChapter.name){
    const oldChapterIndex = book.chapters.findIndex(chapter=>chapter.name === chapterName)
    if(!oldChapterIndex)throw new Error(`book[${book.name}].chapter[${chapterName}] not found`)
    book.chapters[oldChapterIndex] = newChapter
    return this.updateBook(book)
  }
}
