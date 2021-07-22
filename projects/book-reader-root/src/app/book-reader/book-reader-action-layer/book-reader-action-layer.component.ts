import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from '../../app/entity/book';
import { BookService } from '../../app/services/book.service';

@Component({
  selector: 'book-reader-book-reader-action-layer',
  templateUrl: './book-reader-action-layer.component.html',
  styleUrls: ['./book-reader-action-layer.component.css']
})
export class BookReaderActionLayerComponent implements OnInit {
  @Input("book")
  book?:Book
  @Output("cancel")
  onCancelEmitter:EventEmitter<void> = new EventEmitter()
  @Output("switchNextChapter")
  onSwitchNextChapterEmitter:EventEmitter<void> = new EventEmitter()
  @Output("switchPrevChapter")
  onSwitchPrevChapterEmitter:EventEmitter<void> = new EventEmitter()
  constructor(
    private bookService:BookService,
    private router:Router
  ) { }

  ngOnInit(): void {
  }

  onCancelClick(){
    this.onCancelEmitter.emit()
  }

  existsPrevChapter(){
    return  this.book && this.book.chapterIndex>0
  }
  existsNextChapter(){
    return this.book && this.book.chapterIndex<this.book.chapters.length-1
  }

  onSwitchPrevChapter(){
    this.onCancelEmitter.emit()
    this.onSwitchPrevChapterEmitter.emit()
  }
  onSwitchNextChapter(){
    this.onCancelEmitter.emit()
    this.onSwitchNextChapterEmitter.emit()
  }

}
