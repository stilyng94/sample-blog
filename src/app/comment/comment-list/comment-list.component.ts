import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommentModel } from '../../models/comment.model';
import { CommentService } from '../../service/comment.service';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {

  @Input() commentCreator: string;
  isLoggedIn = false;
  loggedInUser: string;
  @Input() comment: CommentModel;
  @Input() commentIndex: any;
  @Output() commentDeleted = new EventEmitter();
  constructor(private commentService: CommentService, private authService: AuthService) { }

  ngOnInit() {
    this.isLoggedIn =  this.authService.getIsAuth();
    this.loggedInUser = this.authService.getUserData()[0];
  }

  commentDelete(commentId) {
    this.commentService.deleteComment(commentId).subscribe(() => {
      this.commentDeleted.emit(this.commentIndex);
    }, (err) => {
      alert(err);
    });
  }

}
