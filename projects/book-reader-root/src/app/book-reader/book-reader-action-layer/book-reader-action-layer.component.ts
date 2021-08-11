import { Inject } from '@angular/core';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { Book } from '../../app/entity/book';
import { BookReaderStyleComponent } from '../book-reader-style/book-reader-style.component';

@Component({
  selector: 'book-reader-book-reader-action-layer',
  templateUrl: './book-reader-action-layer.component.html',
  styleUrls: ['./book-reader-action-layer.component.css']
})
export class BookReaderActionLayerComponent implements OnInit {
  // @Input("book")
  // book?:Book
  // @Output("cancel")
  // onCancelEmitter:EventEmitter<void> = new EventEmitter()
  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA)
    public bookName:string,
    public ref:MatBottomSheetRef<BookReaderActionLayerComponent>,
    private styleConfig:MatBottomSheet,
  ) { }

  ngOnInit(): void {}

  onCancelClick(){
    // this.onCancelEmitter.emit()
  }

  openStyleConfig(){
    this.onCancelClick()
    this.styleConfig.open(BookReaderStyleComponent)
  }
}
