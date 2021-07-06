import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookReaderRoutingModule } from './book-reader-routing.module';
import { BookReaderMainComponent } from './book-reader-main/book-reader-main.component';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [
    BookReaderMainComponent
  ],
  imports: [
    CommonModule,
    BookReaderRoutingModule,
    MaterialModule
  ]
})
export class BookReaderModule { }
