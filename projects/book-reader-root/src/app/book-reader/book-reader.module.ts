import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookReaderRoutingModule } from './book-reader-routing.module';
import { BookReaderMainComponent } from './book-reader-main/book-reader-main.component';
import { MaterialModule } from '../material/material.module';
import { BookReaderActionLayerComponent } from './book-reader-action-layer/book-reader-action-layer.component';
import { BookReaderContentLayerComponent } from './book-reader-content-layer/book-reader-content-layer.component';


@NgModule({
  declarations: [
    BookReaderMainComponent,
    BookReaderActionLayerComponent,
    BookReaderContentLayerComponent
  ],
  imports: [
    CommonModule,
    BookReaderRoutingModule,
    MaterialModule
  ]
})
export class BookReaderModule { }
