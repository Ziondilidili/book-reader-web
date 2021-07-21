import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Component, OnInit, ViewChild } from '@angular/core';
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
  chapterNameItemSize:number = 48
  @ViewChild(CdkVirtualScrollViewport) chapterListContainer!: CdkVirtualScrollViewport;
  scrolled:boolean = false
  constructor(
    private activatedRoute:ActivatedRoute,
    private bookService:BookService,
    private router:Router,
  ) { }
  scrollCurrentChapter(){
    if(this.scrolled || !this.book)return;
    const offset = this.book?.chapterIndex * this.chapterNameItemSize
    this.chapterListContainer.scrollToOffset(offset)
    this.scrolled = true
  }
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
