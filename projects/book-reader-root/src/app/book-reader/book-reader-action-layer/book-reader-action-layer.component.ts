import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BookInfo } from '../../app/entity/book-info';

@Component({
  selector: 'book-reader-book-reader-action-layer',
  templateUrl: './book-reader-action-layer.component.html',
  styleUrls: ['./book-reader-action-layer.component.css']
})
export class BookReaderActionLayerComponent implements OnInit {
  @Input("bookInfo")
  bookInfo?:BookInfo
  @Output("cancel")
  onCancelEmitter:EventEmitter<void> = new EventEmitter()
  constructor() { }

  ngOnInit(): void {
  }

  onCancelClick(){
    this.onCancelEmitter.emit()
  }

}
