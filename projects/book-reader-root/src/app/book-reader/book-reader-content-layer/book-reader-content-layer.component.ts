import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { Chapter } from '../../app/entity/chapter';

@Component({
  selector: 'book-reader-book-reader-content-layer',
  templateUrl: './book-reader-content-layer.component.html',
  styleUrls: ['./book-reader-content-layer.component.css']
})
export class BookReaderContentLayerComponent implements OnInit {
  @Input("chapter")
  chapter?:Chapter
  // @Output("click")
  // onClickEmitter:EventEmitter<void> = new EventEmitter()
  constructor(
  ) { }

  ngOnInit(): void {
  }

  // @HostListener("click")
  // onClick(){
  //   this.onClickEmitter.emit()
  // }
}
