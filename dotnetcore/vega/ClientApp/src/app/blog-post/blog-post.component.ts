import { BlogPostService } from './../services/blog-post.service';
import { BlogPost } from './../models/blogpost';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.css']
})
export class BlogPostComponent implements OnInit {

  blogPost$ : Observable<BlogPost>;
  postId: number;

  constructor(private blogPostService: BlogPostService,
    private route: ActivatedRoute) {
      const idParam = 'id';
      if (this.route.snapshot.params[idParam]) {
        this.postId = this.route.snapshot.params[idParam];
      }
     }

  ngOnInit() {
    this.loadBlogPost();
  }

  loadBlogPost() {
    this.blogPost$ = this.blogPostService.getBlogPost(this.postId);
  }
}
