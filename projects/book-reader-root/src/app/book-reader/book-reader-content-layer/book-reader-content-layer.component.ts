import { Component, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Chapter } from '../../app/entity/chapter';
import { IDB } from "projects/book-reader-root/src/environments/environment"

const chapterSwitchRegionPercent = IDB.BookReader.Config.predefineValue["content.chapterSwitchRegionPercent"]

@Component({
  selector: 'book-reader-book-reader-content-layer',
  templateUrl: './book-reader-content-layer.component.html',
  styleUrls: ['./book-reader-content-layer.component.css']
})
export class BookReaderContentLayerComponent implements OnInit,OnDestroy {
  @Input("chapter")
  chapter?:Chapter
  @Output("close")
  private closeEmitter:EventEmitter<Chapter> = new EventEmitter()
  @Output("switchNextChapter")
  private switchNextChapterEmitter:EventEmitter<void> = new EventEmitter()
  @Output("switchPrevChapter")
  private switchPrevChapterEmitter:EventEmitter<void> = new EventEmitter()
  @Output("toggleOperability")
  private toggleOperabilityEventEmitter:EventEmitter<void> = new EventEmitter()
  // 章节切换区域百分比
  private chapterSwitchRegionPercent:number = chapterSwitchRegionPercent

  constructor() { }
  ngOnInit(): void {
  }
  // 关闭页面时 保存当前阅读状态
  ngOnDestroy(): void {
    if(!this.chapter)return;
    this.chapter.lengthOfReaded = document.documentElement.scrollTop
    this.close()
  }
  // 关闭章节
  close(){
    this.closeEmitter.emit(this.chapter)
  }
  // 滑动页面至上次阅读位置 由(cdkObserveContent)调用
  scrollToLastReadingLocation(){
    if(!this.chapter)return;
    document.documentElement.scroll({
      top:this.chapter?.lengthOfReaded || 0
    })
  }
  // 切换上一页
  switchPrevChapter(){
    this.switchPrevChapterEmitter.emit()
  }
  // 切换下一页
  switchNextChapter(){
    this.switchNextChapterEmitter.emit()
  }
  // 切换操作栏可见性
  toggleOperability(){
    this.toggleOperabilityEventEmitter.emit()
  }
  // 监听鼠标点击事件 用于判断是切换上下页还是切换操作栏可见性
  @HostListener("click",["$event.x"])
  onHostClick(clickedX:number){
    const documentWidth = document.documentElement.clientWidth
    const leftAreaEndWidth = documentWidth*this.chapterSwitchRegionPercent
    const rightAreaStartWidth = documentWidth*(1-this.chapterSwitchRegionPercent)
    if(clickedX < leftAreaEndWidth) this.switchPrevChapter()
    else if(clickedX > rightAreaStartWidth) this.switchNextChapter()
    else this.toggleOperability()
  }
  // 监听键盘按键 实现左右方向键切换上下页
  @HostListener("window:keydown",["$event.key"])
  onKeydown(keyboardEventKey:string){
    switch(keyboardEventKey){
      case "ArrowLeft":{
        this.switchPrevChapter()
      };break;
      case "ArrowRight":{
        this.switchNextChapter()
      };break;
      // case "ArrowUp":{};break;
      // case "ArrowDown":{};break;
      // default:{}
    }
  }
}
