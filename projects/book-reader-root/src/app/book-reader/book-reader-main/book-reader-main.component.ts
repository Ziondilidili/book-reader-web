import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../../app/entity/book';
import { Chapter } from '../../app/entity/chapter';
import { BookService } from '../../app/services/book.service';

@Component({
  selector: 'book-reader-book-reader-main',
  templateUrl: './book-reader-main.component.html',
  styleUrls: ['./book-reader-main.component.css']
})
export class BookReaderMainComponent implements OnInit {
  chapter!:Chapter
  book!:Book
  operable:boolean = false
  constructor(
    private bookService:BookService,
    private activatedRoute:ActivatedRoute,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.loadChapter()
  }

  async onContentLayerClosed(chapter:Chapter){
    return this.bookService.updateChapter(this.book,chapter)
  }

  async onSwitchPrevChapter(){
    if(this.book.chapterIndex<=0)return;
    this.book.chapterIndex--
    await this.bookService.updateBook(this.book)
    this.chapter = this.book.chapters[this.book.chapterIndex]
  }

  async onSwitchNextChapter(){
    if(this.book.chapterIndex>=this.book.chapters.length-1)return;
    this.book.chapterIndex++
    await this.bookService.updateBook(this.book)
    this.chapter = this.book.chapters[this.book.chapterIndex]
  }

  /**
   * 通过路由参数加载章节信息
   */
  private async loadChapter(){
    this.activatedRoute.paramMap.subscribe(async paramMap=>{
      const bookName = paramMap.get("bookName") 
      if(!bookName){
        this.router.navigate(["/page-not-found"])
        return
      }
      const book = await this.bookService.openBook(bookName)
      if(!book){
        this.router.navigate(["/page-not-found"])
        return
      }
      const chapter = book.chapters[book.chapterIndex]
      if(!chapter){
        this.router.navigate(["/page-not-found"])
        return
      }
      this.chapter = chapter
      this.book = book
    })
  }

  /**
   * 控制可操作性
   */
   toggleOperability(){
    this.operable = !this.operable
  }
}
