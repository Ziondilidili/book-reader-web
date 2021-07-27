import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { of, Subject, Subscription } from 'rxjs';
import { concatAll, map } from "rxjs/operators"
import { Config } from '../../app/entity/config';
import { ConfigService } from '../../app/services/config.service';
import { TextIndentSelectorComponent } from '../text-indent-selector/text-indent-selector.component';

@Component({
  selector: 'book-reader-book-reader-style',
  templateUrl: './book-reader-style.component.html',
  styleUrls: ['./book-reader-style.component.css']
})
export class BookReaderStyleComponent implements OnInit,OnDestroy {
  // 配置名与环境变量名映射
  private configNameAndEnvNameMap = {
    fontSizePX:"content.fontSize.px",
    fontWeight:"content.fontWeight",
    fontFamily:"content.fontFamily",
    textIndentEM:"content.textIndent.em",
    fontColor:"content.fontColor",
    bgColor:"content.bgColor",
    lineHeightEM:"content.lineHeight.em"
  }
  // 配置表
  styleConfigMap = new Map<string,Config>()
  // 配置订阅列表
  private subscriptionList:Subscription[] = []

  constructor(
    private configService:ConfigService,
    private dialog:MatDialog
  ) { }
  ngOnInit(): void {
    // 订阅样式配置
    this.subscribeStyleConfig()
    
  }
  ngOnDestroy(): void {
    // 取消所有配置订阅
    this.subscriptionList.forEach(subscription=>subscription.unsubscribe)
  }
  // 订阅样式配置
  private async subscribeStyleConfig(){
    of(...Object.values(this.configNameAndEnvNameMap))
    .pipe(
      map(envName=>this.configService.getObservableConfig(envName)),
      concatAll()
    ).subscribe(subject=>{
      const subscription = subject.subscribe(config=>{
        this.styleConfigMap.set(config.name,config)
      })
      this.subscriptionList.push(subscription)
    })
  }
  // 更改字体大小
  updateFontSizePX(dsize:number){
    const config = this.styleConfigMap.get("content.fontSize.px")
    if(!config)return;
    config.value+=dsize
    this.configService.updateObservableConfig(config)
  }
  // 更改是否粗体
  updateFontWeight(fontWeight:string){
    const config = this.styleConfigMap.get("content.fontWeight")
    if(!config)return;
    config.value = fontWeight
    this.configService.updateObservableConfig(config)
  }
  // 更改字体
  updateFontFamily(fontFamily:string){
    const config = this.styleConfigMap.get("content.fontFamily")
    if(!config)return;
    config.value = fontFamily
    this.configService.updateObservableConfig(config)
  }
  // 更改缩进
  updateTextIndentEM(textIndentEM:number){
    const config = this.styleConfigMap.get("content.textIndent.em")
    if(!config)return;
    config.value = textIndentEM
    this.configService.updateObservableConfig(config)
  }
  // 更改字体颜色
  updateFontColor(fontColor:string){
    const config = this.styleConfigMap.get("content.fontColor")
    if(!config)return;
    config.value = fontColor
    this.configService.updateObservableConfig(config)
  }
  // 更改背景颜色
  updateBgColor(bgColor:string){
    const config = this.styleConfigMap.get("content.bgColor")
    if(!config)return;
    config.value = bgColor
    this.configService.updateObservableConfig(config)
  }
  // 更改行高
  updateLineHeightEM(lineHeightEM:number){
    const config = this.styleConfigMap.get("content.lineHeight.em")
    if(!config)return;
    config.value = lineHeightEM
    this.configService.updateObservableConfig(config)
  }

  // 打开缩进选择对话框
  openTextIndentSelectorDialog(currentTextIndentValue:number){
    const dialog = this.dialog.open<TextIndentSelectorComponent,number,number>(TextIndentSelectorComponent,{
      data:currentTextIndentValue
    })
    dialog.afterClosed().subscribe(updatedTextIndentValue=>{
      if(!updatedTextIndentValue || updatedTextIndentValue === currentTextIndentValue)return;
      this.updateTextIndentEM(updatedTextIndentValue)
    })
  }
}
