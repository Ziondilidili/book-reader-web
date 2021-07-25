import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { IDB } from 'projects/book-reader-root/src/environments/environment';
import { Config } from '../../app/entity/config';
import { ConfigService } from '../../app/services/config.service';

const defaultValue = IDB.BookReader.Config.defaultValue
const { content:contentDefaultValue } = defaultValue

@Component({
  selector: 'book-reader-book-reader-style',
  templateUrl: './book-reader-style.component.html',
  styleUrls: ['./book-reader-style.component.css']
})
export class BookReaderStyleComponent implements OnInit {
  fontSize?:Config
  // bold?:Config
  // fontFamily?:Config
  // textIndent?:Config
  // fontColor?:Config
  // bgColor?:Config

  @Output("update")
  private updateEmitter = new EventEmitter<Config>()
  
  constructor(
    private configService:ConfigService,
    private styleConfigRef:MatBottomSheetRef<BookReaderStyleComponent>
  ) { }

  ngOnInit(): void {
    this.loadInitialConfig()
  }

  async loadInitialConfig(){
    this.fontSize = await this.configService.getConfig("content.fontSize",contentDefaultValue.fontSize)
    // this.bold = await this.configService.getConfig("content.bold",contentDefaultValue.bold)
    // this.fontFamily = await this.configService.getConfig("content.fontFamily",contentDefaultValue.fontFamily)
    // this.textIndent = await this.configService.getConfig("content.textIndent",contentDefaultValue.textIndent)
    // this.fontColor = await this.configService.getConfig("content.fontColor",contentDefaultValue.fontColor)
    // this.bgColor = await this.configService.getConfig("content.bgColor",contentDefaultValue.bgColor)
  }

  async updateFontSize(dsize:number){
    if(!this.fontSize)return;
    this.fontSize.value+=dsize
    await this.configService.setConfig(this.fontSize)
    this.updateEmitter.emit(this.fontSize)
  }

}
