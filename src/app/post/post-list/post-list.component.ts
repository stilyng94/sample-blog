import { Component, OnInit } from '@angular/core';
import { PostModel } from '../../models/post.model';
import { PostsService } from '../../service/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  posts: PostModel[] = [];
  loadingError = false;

  constructor(private postService: PostsService) {}

  ngOnInit() {

    this.postService.getAllPosts().subscribe(
      data => {
        this.loadingError = false;
        this.posts = data.posts;
      },
      err => {
        this.loadingError = true;
      }
    );
  }
}
