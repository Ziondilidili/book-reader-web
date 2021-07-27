import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookReaderRoutingModule } from './book-reader-routing.module';
import { BookReaderMainComponent } from './book-reader-main/book-reader-main.component';
import { MaterialModule } from '../material/material.module';
import { BookReaderActionLayerComponent } from './book-reader-action-layer/book-reader-action-layer.component';
import { BookReaderContentLayerComponent } from './book-reader-content-layer/book-reader-content-layer.component';
import { BookReaderChapterListComponent } from './book-reader-chapter-list/book-reader-chapter-list.component';
import { BookReaderStyleComponent } from './book-reader-style/book-reader-style.component';
import { BookReaderSettingComponent } from './book-reader-setting/book-reader-setting.component';
import { TextIndentSelectorComponent } from './text-indent-selector/text-indent-selector.component';


@NgModule({
  declarations: [
    BookReaderMainComponent,
    BookReaderActionLayerComponent,
    BookReaderContentLayerComponent,
    BookReaderChapterListComponent,
    BookReaderStyleComponent,
    BookReaderSettingComponent,
    TextIndentSelectorComponent
  ],
  imports: [
    CommonModule,
    BookReaderRoutingModule,
    MaterialModule
  ]
})
export class BookReaderModule { }
