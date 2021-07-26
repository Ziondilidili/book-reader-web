import { Injectable } from '@angular/core';
import { IDB } from 'projects/book-reader-root/src/environments/environment';
import { IDBRequestConvertor } from 'projects/indexed-db/src/public-api';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { Config } from '../entity/config';
import { BookReaderService } from './book-reader.service';

const {
  Config: IDBBookReaderConfig
} = IDB.BookReader
const {
  name: IDBBookReaderConfigName,
  pkey: IDBBookReaderConfigPKey,
  keys: IDBBookReaderConfigKeys,
  predefineValue:IDBBookReaderConfigPredefineValue
} = IDBBookReaderConfig

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private configCache = new Map<string,Config>()
  private configSubjectCache = new Map<string,BehaviorSubject<Config>>()

  constructor(
    private bookReaderService:BookReaderService
  ) { }

  /** 获取环境变量中预定义配置
   * @param name 配置名称
   * @returns 配置对象
   */
  private getPredefineConfigFromEnv(name:string):Config{
    if(!IDBBookReaderConfigPredefineValue)
      throw new Error("Env[IDB.Config.predefineValue] is missing")
    const predefineValue = IDBBookReaderConfigPredefineValue[name]
    return new Config(name,predefineValue)
  }

  /** 打开BookReader数据库Config文档
   * @param mode 打开模式
   * @returns Config文档
   */
  private async openIDBBookReaderConfigStore(mode?: IDBTransactionMode): Promise<IDBObjectStore> {
    const idb = await this.bookReaderService.openIDBBookReader()
    if (idb.objectStoreNames.contains(IDBBookReaderConfigName)) {
      return idb.transaction(IDBBookReaderConfigName, mode).objectStore(IDBBookReaderConfigName)
    }
    // console.log(idb)
    const upgradeIdb = await this.bookReaderService.upgradeIDBBookReader()
    // console.log(upgradeIdb)
    const store = upgradeIdb.createObjectStore(IDBBookReaderConfigName, { keyPath: IDBBookReaderConfigPKey })
    // IDBBookReaderConfigKeys.forEach(key=>store.createIndex(key.name,key.name,key.options))
    // upgradeIdb.close()
    return this.openIDBBookReaderConfigStore(mode)
  }

  /** 通过配置名称获取配置对象
   * @param name 配置名称
   * @returns 配置对象
   */
  public async getConfig(name:string):Promise<Config>{
    if(this.configCache.has(name))return this.configCache.get(name)!
    const store = await this.openIDBBookReaderConfigStore()
    const getRequest = store.get(name)
    let config = await IDBRequestConvertor<any,Config>(getRequest)
    config = config || this.getPredefineConfigFromEnv(name)
    this.configCache.set(config.name,config)
    return config
  }

  /** 设定设置
   * @param config 配置对象
   */
  public async setConfig(config:Config):Promise<void>{
    // Unnecessary cache cleanup
    // if(this.configCache.has(config.name))this.configCache.delete(config.name)
    const store = await this.openIDBBookReaderConfigStore("readwrite")
    const putRequest = store.put(config)
    await IDBRequestConvertor(putRequest)
    this.configCache.set(config.name,config)
  }

  /** 获取指定配置Subject(带有初始值)
   * @param name 配置名称
   * @returns 配置Subject
   */
  public async getObservableConfig(name:string):Promise<BehaviorSubject<Config>>{
    if(this.configSubjectCache.has(name))return this.configSubjectCache.get(name)!
    const config = await this.getConfig(name)
    const subject = new BehaviorSubject<Config>(config)
    return subject
  }
}
