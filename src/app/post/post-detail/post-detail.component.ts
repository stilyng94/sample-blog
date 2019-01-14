import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../service/post.service';
import { PostModel } from '../../models/post.model';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CommentModel } from '../../models/comment.model';
import { CommentService } from '../../service/comment.service';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {

  post: PostModel;
  comments: CommentModel[] = [];
  commentsLoadingError = false;
  loadingError = false;
  private postId: string;
  readyToAddComment = false;
  isAuthenticated = false;


  constructor(private postService: PostsService, private route: ActivatedRoute
    , private commentService: CommentService, private authService: AuthService) { }

  ngOnInit() {
    this.isAuthenticated = this.authService.getIsAuth();
    this.route.paramMap.subscribe((param: ParamMap) => {
      this.postId = param.get('postId');
    });
    this.postService.getPost(this.postId).subscribe((data) => {
      this.loadingError = false;
      this.post = data.post;
    }, (err) => {
      this.loadingError = true;
      alert(err);
    });
  }

  onViewComments(postId) {
    this.commentService.getCommentsOfPost(postId).subscribe((data) => {
      if (data.comments.length === 0) {
        this.commentsLoadingError = true;
        this.comments = [];
      } else {
        this.commentsLoadingError = false;
        this.comments = data.comments;
      }
      this.comments = data.comments;
    }, (err) => {
      alert(err);
      this.commentsLoadingError = true;
    });
  }

  onDeleteComment(event) {
    const deleteIndex = +event;
    this.comments.splice(deleteIndex, 1);
    if (this.comments.length === 0) {
      this.commentsLoadingError = true;
    } else {
      this.commentsLoadingError = false;
    }
  }

  latestComment(event) {
    this.comments.unshift(event);
  }
  NotAddComment(event) {
    this.readyToAddComment = event;
  }
}
