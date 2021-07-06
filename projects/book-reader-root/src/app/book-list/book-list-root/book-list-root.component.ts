import { Component, OnInit, ViewChild } from '@angular/core';
import { BookService } from '../../app/services/book.service';

@Component({
  selector: 'book-reader-book-list-root',
  templateUrl: './book-list-root.component.html',
  styleUrls: ['./book-list-root.component.css']
})
export class BookListRootComponent implements OnInit {
  bookNameList:string[] = []
  constructor(
    private bookService:BookService
  ) { }

  ngOnInit(): void {
    this.bookService.listBooks()
    .then(bookNameList=>this.bookNameList = bookNameList)
  }

  async getBookInfo(bookName:string){
    const info = await this.bookService.getBookInfo(bookName)
    console.log(info)
  }

}
