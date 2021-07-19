import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookReaderChapterListComponent } from './book-reader-chapter-list/book-reader-chapter-list.component';
import { BookReaderMainComponent } from './book-reader-main/book-reader-main.component';
import { BookReaderSettingComponent } from './book-reader-setting/book-reader-setting.component';
import { BookReaderStyleComponent } from './book-reader-style/book-reader-style.component';

const routes: Routes = [
  {
    path:"setting",
    component:BookReaderSettingComponent
  },{
    path:"style",
    component:BookReaderStyleComponent
  },{
    path:":bookName/chapter-list",
    component:BookReaderChapterListComponent
  },{
    path:":bookName/:name",
    component:BookReaderMainComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookReaderRoutingModule { }
