import { Component, ElementRef, EventEmitter, HostListener, OnInit, Output, ViewChild } from '@angular/core';
import { BookService } from '../../app/services/book.service';

@Component({
  selector: 'book-reader-txt-book-uploader',
  templateUrl: './txt-book-uploader.component.html',
  styleUrls: ['./txt-book-uploader.component.css']
})
export class TxtBookUploaderComponent implements OnInit {
  @Output("upload")
  uploadEventEmitter:EventEmitter<void> = new EventEmitter<void>()
  @ViewChild("BookSelector",{static:true})
  uploader!: ElementRef<HTMLInputElement>;
  constructor(
    private bookService:BookService
  ) { }

  ngOnInit(): void {
  }

  async onBookUploaded(selectedFiles:FileList|null){
    if(!selectedFiles || selectedFiles.length === 0)return;
    const txtBookFile = selectedFiles.item(0)
    if(!txtBookFile)return;
    const fileName = txtBookFile.name
    const bookName = fileName.slice(0,fileName.lastIndexOf("\."))
    await this.bookService.generateBookFromFile(bookName,txtBookFile)
    this.uploadEventEmitter.emit()
  }

  @HostListener("click")
  onClick(){
    this.uploader.nativeElement.click()
  }

}
