import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Chapter } from '../../app/entity/chapter';
import { BookService } from '../../app/services/book.service';

@Component({
  selector: 'book-reader-book-reader-main',
  templateUrl: './book-reader-main.component.html',
  styleUrls: ['./book-reader-main.component.css']
})
export class BookReaderMainComponent implements OnInit {
  chapter?:Chapter
  constructor(
    private bookService:BookService,
    private activatedRoute:ActivatedRoute,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(paramMap=>{
      const bookName = paramMap.get("bookName") 
      const title = paramMap.get("title")
      if(!bookName||!title){
        this.router.navigate(["/list"])
        return
      }
      this.bookService.getChapterWithTitle(bookName,title)
      .then(chapter=>{
        this.chapter = chapter
      })
    })
  }

  // getBookInfo(bookName:string){
  //   const info = this.bookService.getBookInfo(bookName)
  //   console.log(info)
  // }

}
