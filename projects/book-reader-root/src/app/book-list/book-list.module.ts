import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookListRoutingModule } from './book-list-routing.module';
import { BookListRootComponent } from './book-list-root/book-list-root.component';
import { MaterialModule } from '../material/material.module';
import { TxtBookUploaderComponent } from './txt-book-uploader/txt-book-uploader.component';


@NgModule({
  declarations: [
    BookListRootComponent,
    TxtBookUploaderComponent
  ],
  imports: [
    CommonModule,
    BookListRoutingModule,
    MaterialModule
  ]
})
export class BookListModule { }
