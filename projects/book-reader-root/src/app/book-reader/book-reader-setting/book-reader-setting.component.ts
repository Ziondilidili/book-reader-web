import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Config } from '../../app/entity/config';
import { ConfigService } from '../../app/services/config.service';

@Component({
  selector: 'book-reader-book-reader-setting',
  templateUrl: './book-reader-setting.component.html',
  styleUrls: ['./book-reader-setting.component.css']
})
export class BookReaderSettingComponent implements OnInit,OnDestroy {
  touchableConfig?:Config
  scriptionList:Subscription[] = []
  constructor(
    private configService:ConfigService,
  ) { }
  ngOnInit(): void {
    // 订阅可触摸性
    (async ()=>{
      const touchableConfigScription = (await this.configService.getObservableConfig("content.userSelect")).subscribe(config=>{
        this.touchableConfig = config
      })
      this.scriptionList.push(touchableConfigScription)
    })()
  }
  ngOnDestroy(): void {
    // 取消订阅所有主题
    this.scriptionList.forEach(scription=>scription.unsubscribe())
  }

  // 更改可触摸性
  updateTouchable(touchable:string){
    if(!this.touchableConfig)return;
    this.touchableConfig.value = touchable
    this.configService.updateObservableConfig(this.touchableConfig)
  }

  // 返回上一页
  routerBackPrevPage(){
    history.go(-1)
  }

}
