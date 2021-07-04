import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    /**
     * 书籍列表模块
     */
    path:"list",
    loadChildren:()=>import("projects/book-reader-root/src/app/book-list/book-list.module").then(m=>m.BookListModule)
  },{
    /**
     * 如果访问根目录
     * 则自动重定向到书籍列表模块
     */
    path:"",
    pathMatch:"full",
    redirectTo:"list"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
