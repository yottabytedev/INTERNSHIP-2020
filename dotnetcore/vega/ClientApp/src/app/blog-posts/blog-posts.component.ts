import { BlogPostService } from './../services/blog-post.service';
import { BlogPost } from './../models/blogpost';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-blog-posts',
  templateUrl: './blog-posts.component.html',
  styleUrls: ['./blog-posts.component.css']
})
export class BlogPostsComponent implements OnInit {

  blogPosts$ : Observable<BlogPost[]>;

  constructor(private blogPostService: BlogPostService) { }

  ngOnInit() {
    this.loadBlogPosts();
  }

  loadBlogPosts() {
    this.blogPosts$ = this.blogPostService.getBlogPosts();
  }
  delete(postId: number) {
    const ans = confirm('Do you want to delete blog with id' + postId);
    if (ans) {
      this.blogPostService.deleteBlogPost(postId)
        .subscribe((data) => {
          this.loadBlogPosts();
        });
      
    }
  }
}
