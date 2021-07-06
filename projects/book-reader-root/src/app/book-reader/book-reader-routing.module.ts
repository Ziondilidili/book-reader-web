import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookReaderMainComponent } from './book-reader-main/book-reader-main.component';

const routes: Routes = [
  {
    path:"reading",
    component:BookReaderMainComponent
  },{
    path:"",
    pathMatch:"full",
    redirectTo:"reading"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookReaderRoutingModule { }
