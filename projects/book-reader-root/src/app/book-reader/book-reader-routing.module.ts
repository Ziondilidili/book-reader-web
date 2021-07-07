import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookReaderChapterListComponent } from './book-reader-chapter-list/book-reader-chapter-list.component';
import { BookReaderMainComponent } from './book-reader-main/book-reader-main.component';
import { BookReaderSettingComponent } from './book-reader-setting/book-reader-setting.component';
import { BookReaderStyleComponent } from './book-reader-style/book-reader-style.component';

const routes: Routes = [
  {
    path:":bookName/:title",
    component:BookReaderMainComponent
  },{
    path:"setting",
    component:BookReaderSettingComponent
  },{
    path:"style",
    component:BookReaderStyleComponent
  },{
    path:"chapter-list",
    component:BookReaderChapterListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookReaderRoutingModule { }
