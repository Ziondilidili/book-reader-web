import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Chapter } from '../../app/entity/chapter';
import { BookService } from '../../app/services/book.service';

@Component({
  selector: 'book-reader-book-reader-content-layer',
  templateUrl: './book-reader-content-layer.component.html',
  styleUrls: ['./book-reader-content-layer.component.css']
})
export class BookReaderContentLayerComponent implements OnInit,OnDestroy {
  @Input("chapter")
  chapter?:Chapter
  @Output("close")
  onClose:EventEmitter<Chapter> = new EventEmitter()
  @ViewChild("content")
  private content!:ElementRef<HTMLSpanElement>
  constructor(
    private bookService:BookService
  ) { }
  ngOnDestroy(): void {
    if(!this.chapter)return;
    this.chapter.lengthOfReaded = document.documentElement.scrollTop
    this.onClose.emit(this.chapter)
  }
  ngOnInit(): void {
  }
  scrollToLastReadingLocation(){
    if(!this.chapter)return;
    document.documentElement.scroll({
      top:this.chapter?.lengthOfReaded || 0
    })
  }
}
