import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Chapter } from '../../app/entity/chapter';
import { BookService } from '../../app/services/book.service';

@Component({
  selector: 'book-reader-book-list-root',
  templateUrl: './book-list-root.component.html',
  styleUrls: ['./book-list-root.component.css']
})
export class BookListRootComponent implements OnInit {
  bookNameList:string[] = []
  constructor(
    private bookService:BookService,
    private router:Router 
  ) { }

  ngOnInit(): void {
    this.bookService.listBookNames()
    .then(bookNameList=>this.bookNameList = bookNameList)
  }

  async openBook(bookName:string){
    this.router.navigate(["/reader",bookName])
  }

}
