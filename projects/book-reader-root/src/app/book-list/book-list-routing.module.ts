import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookListRootComponent } from './book-list-root/book-list-root.component';

const routes: Routes = [
  {
    /**
     * 书籍列表
     */
    path:"",
    pathMatch:"full",
    component:BookListRootComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookListRoutingModule { }
