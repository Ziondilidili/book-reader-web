import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookInfo } from '../../app/entity/book-info';
import { Chapter } from '../../app/entity/chapter';
import { BookService } from '../../app/services/book.service';

@Component({
  selector: 'book-reader-book-reader-main',
  templateUrl: './book-reader-main.component.html',
  styleUrls: ['./book-reader-main.component.css']
})
export class BookReaderMainComponent implements OnInit {
  chapter?:Chapter
  title:string = "loading"
  content:string = ""
  // paragraphs:string[] = []
  constructor(
    private bookService:BookService,
    private activatedRoute:ActivatedRoute,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.initChapter()
  }

  private async initChapter(){
    this.activatedRoute.paramMap.subscribe(async paramMap=>{
      const bookName = paramMap.get("bookName") 
      const title = paramMap.get("title")
      if(!bookName||!title){
        this.router.navigate(["/list"])
        return
      }
      const bookInfo = await this.bookService.getBookInfo(bookName)
      const chapter = await this.bookService.getChapterWithTitle(bookName,title)
      if(!chapter){
        this.router.navigate(["/page-not-found"])
        return
      }
      this.resolveChapter(chapter,bookInfo)
    })
  }

  private resolveChapter(chapter:Chapter,bookInfo:BookInfo){
    this.chapter = chapter
    this.title = chapter.title
    this.content = chapter.content.trim()
    // this.paragraphs = this.content.split(/[\f\n\r]+/g)
  }
}
