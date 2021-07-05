import { Injectable } from '@angular/core';
import { IDBName } from 'projects/book-reader-root/src/environments/environment';
import { IDBService } from 'projects/indexed-db/src/public-api';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(
    private idbService:IDBService
  ) {
    /**
     * 初始化数据库
     * 创建Book本地数据库
     */
     this.idbService.includeIDB(IDBName.books)
     .then(flag=>{
       console.log(flag?"数据库已存在":"数据库不存在，但创建完毕")
     }).catch(console.log)
  }
}
