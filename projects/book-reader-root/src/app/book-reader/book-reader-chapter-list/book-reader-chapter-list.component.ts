import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../../app/entity/book';
import { BookService } from '../../app/services/book.service';

@Component({
  selector: 'book-reader-book-reader-chapter-list',
  templateUrl: './book-reader-chapter-list.component.html',
  styleUrls: ['./book-reader-chapter-list.component.css']
})
export class BookReaderChapterListComponent implements OnInit {
  book?:Book
  chapterNameList:string[] = []
  constructor(
    private activatedRoute:ActivatedRoute,
    private bookService:BookService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(async paramMap=>{
      const bookName = paramMap.get("bookName")
      if(!bookName){
        this.router.navigate(["/"])
        return
      }
      const book = await this.bookService.openBook(bookName)
      if(!book){
        this.router.navigate(["/"])
        return
      }
      this.book = book
      this.chapterNameList = Book.getChapterNameList(book)
    })
  }
  
  navigateChapter(index:number){
    if(!this.book)return;
    this.book.chapterIndex = index
    this.bookService.updateBook(this.book).then(()=>{
      this.router.navigate(["/reader",this.book!.name])
    })
  }

}
