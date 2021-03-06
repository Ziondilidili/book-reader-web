import { Injectable } from '@angular/core';
import { IDBRequestConvertor, IDBService } from 'projects/indexed-db/src/public-api';
import { IDB } from "projects/book-reader-root/src/environments/environment"
import { Book } from '../entity/book';
import { Chapter } from '../entity/chapter';
import { BookReaderService } from './book-reader.service';

const {
  Book: IDBBookReaderBook
} = IDB.BookReader
const {
  name: IDBBookReaderBookName,
  pkey: IDBBookReaderBookPKey,
  keys: IDBBookReaderBookKeys
} = IDBBookReaderBook
const NullFn = () => { }

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private bookCache = new Map<string,Book>()
  constructor(
    private bookReaderService:BookReaderService
  ) {}

  /** 打开BookReader数据库Book数据文档
   * @param mode 打开模式
   * @returns 事务模式下IDBObjectStore套接字
   */
  private async openIDBBookReaderBookStore(mode?: IDBTransactionMode): Promise<IDBObjectStore> {
    const idb = await this.bookReaderService.openIDBBookReader()
    if (!idb.objectStoreNames.contains(IDBBookReaderBookName))
      throw new Error(`IDB[${idb.name}].Store[${IDBBookReaderBookName}] is not exists`)
    return idb.transaction(IDBBookReaderBookName, mode).objectStore(IDBBookReaderBookName)
  }

  /** 列出书籍名称列表
   * @returns 书籍名称列表
   */
  async listBookNames(): Promise<string[]> {
    const store = await this.openIDBBookReaderBookStore()
    const getAllKeysRequest = store.getAllKeys()
    return IDBRequestConvertor(getAllKeysRequest, keys => keys as string[])
  }

  /** 创建书籍
   * @param book 书籍信息
   */
  async createBook(book: Book): Promise<void> {
    const store = await this.openIDBBookReaderBookStore("readwrite")
    const getAllKeysRequest = store.getAllKeys(book.name)
    const bookNameList = await IDBRequestConvertor<IDBValidKey[],string[]>(getAllKeysRequest)
    if(bookNameList.includes(book.name))return;
    const request = store.add(book)
    return IDBRequestConvertor<IDBValidKey, void>(request, NullFn)
  }

  /** 更新书籍
   * @param book 书籍信息 
   */
  async updateBook(book: Book,bookName?:string): Promise<void> {
    const store = await this.openIDBBookReaderBookStore("readwrite")
    const request = store.put(book,bookName)
    await IDBRequestConvertor<IDBValidKey, void>(request, NullFn)
    if(!!bookName)this.bookCache.delete(bookName)
    this.bookCache.set(book.name,book)
  }

  /** 删除书籍
   * @param bookName 书籍名称
   */
  async deleteBook(bookName: string): Promise<void> {
    const store = await this.openIDBBookReaderBookStore("readwrite")
    const request = store.delete(bookName)
    await IDBRequestConvertor<undefined, void>(request, NullFn)
    this.bookCache.delete(bookName)
  }

  /** 打开书籍
   * @param bookName 书籍名称 
   * @returns 书籍
   */
  async openBook(bookName: string): Promise<Book> {
    const store = await this.openIDBBookReaderBookStore()
    const request = store.get(bookName)
    const book = await IDBRequestConvertor<any, Book>(request)
    if(!!book)this.bookCache.set(book.name,book)
    return book
  }

  /** 更新章节
   * @param book 章节所属书本 
   * @param newChapter 更改后的章节
   * @param chapterName 章节名称（可选）
   */
  async updateChapter(book:Book,newChapter:Chapter,chapterName:string = newChapter.name){
    const oldChapterIndex = book.chapters.findIndex(chapter=>chapter.name === chapterName)
    if(oldChapterIndex === -1)throw new Error(`book[${book.name}].chapter[${chapterName}] not found`)
    book.chapters[oldChapterIndex] = newChapter
    book.chapterNameList[oldChapterIndex] = chapterName
    return this.updateBook(book)
  }
}
