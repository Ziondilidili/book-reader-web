import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Book } from '../../app/entity/book';
import { Chapter } from '../../app/entity/chapter';
import { Config } from '../../app/entity/config';
import { BookService } from '../../app/services/book.service';
import { ConfigService } from '../../app/services/config.service';

@Component({
  selector: 'book-reader-book-reader-main',
  templateUrl: './book-reader-main.component.html',
  styleUrls: ['./book-reader-main.component.css']
})
export class BookReaderMainComponent implements OnInit,OnDestroy {
  chapter!:Chapter
  book!:Book
  operable:boolean = false

  // observable config
  bgColor?:Config
  // subscription list
  subscriptionList:Subscription[] = []

  constructor(
    private bookService:BookService,
    private activatedRoute:ActivatedRoute,
    private router:Router,
    private configService:ConfigService,
  ) { }
  ngOnInit(): void {
    this.loadChapter()
    this.observeStyleConfig()
  }
  ngOnDestroy(): void {
    this.subscriptionList.forEach(subscription=>subscription.unsubscribe())
  }
  // 观察样式配置
  private async observeStyleConfig(){
    const bgColorSubscription = (await this.configService.getObservableConfig("content.bgColor")).subscribe(config=>{
      this.bgColor = config
    })
    this.subscriptionList.push(bgColorSubscription)
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
