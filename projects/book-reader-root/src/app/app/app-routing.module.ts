import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

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
  },{
    /**
     * 404页
     * 如果未匹配任何页面
     * 则跳转至此
     */
    path:"**",
    component:PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
