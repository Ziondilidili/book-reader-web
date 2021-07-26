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
  private onClose:EventEmitter<Chapter> = new EventEmitter()
  @Output("switchNextChapter")
  private onSwitchNextChapterEmitter:EventEmitter<void> = new EventEmitter()
  @Output("switchPrevChapter")
  private onSwitchPrevChapterEmitter:EventEmitter<void> = new EventEmitter()
  @Output("toggleOperability")
  private onToggleOperabilityEventEmitter:EventEmitter<void> = new EventEmitter()

  private chapterSwitchRegionPercent:number = chapterSwitchRegionPercent
  // private chapterSwitchRegionPercent:number = 0.33
  constructor() { }
  ngOnDestroy(): void {
    if(!this.chapter)return;
    this.chapter.lengthOfReaded = document.documentElement.scrollTop
    this.onClose.emit(this.chapter)
  }
  scrollToLastReadingLocation(){
    if(!this.chapter)return;
    document.documentElement.scroll({
      top:this.chapter?.lengthOfReaded || 0
    })
  }
  ngOnInit(): void {
  }
  onSwitchPrevChapter(){
    this.onSwitchPrevChapterEmitter.emit()
  }
  onSwitchNextChapter(){
    this.onSwitchNextChapterEmitter.emit()
  }
  onToggleOperability(){
    this.onToggleOperabilityEventEmitter.emit()
  }

  @HostListener("click",["$event.x"])
  onHostClick(clickedX:number){
    const documentWidth = document.documentElement.clientWidth
    const leftAreaEndWidth = documentWidth*this.chapterSwitchRegionPercent
    const rightAreaStartWidth = documentWidth*(1-this.chapterSwitchRegionPercent)
    if(clickedX < leftAreaEndWidth) this.onSwitchPrevChapter()
    else if(clickedX > rightAreaStartWidth) this.onSwitchNextChapter()
    else this.onToggleOperability()
  }

  @HostListener("window:keydown",["$event.key"])
  onKeydown(keyboardEventKey:string){
    switch(keyboardEventKey){
      case "ArrowLeft":{
        this.onSwitchPrevChapter()
      };break;
      case "ArrowRight":{
        this.onSwitchNextChapter()
      };break;
      // case "ArrowUp":{};break;
      // case "ArrowDown":{};break;
      // default:{}
    }
  }
}
