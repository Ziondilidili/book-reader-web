import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Book } from '../../app/entity/book';

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
  constructor() { }

  ngOnInit(): void {
  }

  onCancelClick(){
    this.onCancelEmitter.emit()
  }
}
