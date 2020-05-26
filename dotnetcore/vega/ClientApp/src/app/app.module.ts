import { BlogPostService } from './services/blog-post.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { BlogPostsComponent } from './blog-posts/blog-posts.component';
import { BlogPostComponent } from './blog-post/blog-post.component';
import { BlogPostAddEditComponent } from './blog-post-add-edit/blog-post-add-edit.component';

@NgModule({
   declarations: [
      AppComponent,
      NavMenuComponent,
      HomeComponent,
      CounterComponent,
      FetchDataComponent,
      BlogPostsComponent,
      BlogPostComponent,
      BlogPostAddEditComponent
   ],
   imports: [
   BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: BlogPostsComponent, pathMatch: 'full' },
      { path: 'blogpost/:id', component: BlogPostComponent },
      { path: 'add', component: BlogPostAddEditComponent },
      { path: 'blogpost/edit/:id', component: BlogPostAddEditComponent },
      { path: '**', redirectTo: '/' }
    ]),
    ReactiveFormsModule

  ],
  providers: [
      BlogPostService 
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
