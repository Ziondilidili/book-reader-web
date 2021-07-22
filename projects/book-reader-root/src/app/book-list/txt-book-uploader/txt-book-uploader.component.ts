import { Component, ElementRef, EventEmitter, HostListener, OnInit, Output, ViewChild } from '@angular/core';
import { Book } from '../../app/entity/book';
import { BookService } from '../../app/services/book.service';
import { TxtResolverService } from '../../app/services/txt-resolver.service';

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
    private bookService:BookService,
    private txtResolver:TxtResolverService
  ) { }

  ngOnInit(): void {
  }

  private async loadContentFromTxtFile(file:File):Promise<string|undefined>{
    return new Promise((resolve,reject)=>{
      const fileReader = new FileReader()
      fileReader.onload = ev=>{
        resolve(fileReader.result?.toString())
      }
      fileReader.onerror = reject
      fileReader.readAsText(file,"gb2312")
    })
  }

  async onBookUploaded(selectedFiles:FileList|null){
    if(!selectedFiles || selectedFiles.length === 0)return;
    const txtBookFile = selectedFiles.item(0)
    if(!txtBookFile)return;
    const fileName = txtBookFile.name
    const bookName = fileName.slice(0,fileName.lastIndexOf("\."))
    const txtContent = await this.loadContentFromTxtFile(txtBookFile)
    if(!txtContent)return;
    const chapters = this.txtResolver.spliteChapter(txtContent)
    const book = new Book(bookName,chapters,fileName)
    await this.bookService.createBook(book)
    this.uploadEventEmitter.emit()
  }

  @HostListener("click")
  onClick(){
    this.uploader.nativeElement.click()
  }

}
