import { Component, OnInit } from '@angular/core';
import { PostModel } from '../../models/post.model';
import { PostsService } from '../../service/post.service';


@Component({
  selector: 'app-manage-post',
  templateUrl: './manage-posts.component.html',
  styleUrls: ['./manage-posts.component.css']
})
export class ManagePostsComponent implements OnInit {

  posts: PostModel[] = [];
  loadingError = false;

  constructor(private postService: PostsService) { }

  ngOnInit() {
    this.postService.getUserPosts().subscribe(
      data => {
        this.loadingError = false;
        this.posts = data.posts;
      },
      err => {
        this.loadingError = true;
        alert(err);
      }
    );
  }

  onDelete(postId, index) {
    this.postService.deletePost(postId).subscribe(() => {
      const postIndex = +index;
      this.posts.splice(postIndex, 1);
    }, (err) => {
      alert(err);
    });
  }

}
