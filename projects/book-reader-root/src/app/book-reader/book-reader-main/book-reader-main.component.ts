import { Component, OnInit } from '@angular/core';
import { BookService } from '../../app/services/book.service';

@Component({
  selector: 'book-reader-book-reader-main',
  templateUrl: './book-reader-main.component.html',
  styleUrls: ['./book-reader-main.component.css']
})
export class BookReaderMainComponent implements OnInit {

  constructor(
    private bookService:BookService
  ) { }

  ngOnInit(): void {
  }

  getBookInfo(bookName:string){
    const info = this.bookService.getBookInfo(bookName)
    console.log(info)
  }

}
