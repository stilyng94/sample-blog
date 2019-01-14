import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { CommentModel } from '../../models/comment.model';
import { isNullOrUndefined } from 'util';
import { CommentService } from '../../service/comment.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-comment-create',
  templateUrl: './comment-create.component.html',
  styleUrls: ['./comment-create.component.css']
})
export class CommentCreateComponent implements OnInit {
  @Output() commentAdded = new EventEmitter();
  @Input() postId: string;
  newComment: CommentModel;
  @Output() toggleReadyToAddComment = new EventEmitter();

  constructor(private commentService: CommentService) { }

  ngOnInit() {
    this.newComment = {};
  }

  onCreateComment() {
    if (isNullOrUndefined(this.newComment.content)) {
      return;
    }
    this.newComment.postId = this.postId;
    this.commentService.createComment(this.newComment).subscribe(
      data => {
        this.commentAdded.emit(data.comment);
        this.toggleReadyToAddComment.emit(false);
      },
      err => {
        alert(err);
      }
    );
  }

  onCancelComment(commentForm: NgForm) {
    commentForm.resetForm();
    this.newComment = {};
    this.toggleReadyToAddComment.emit(false);
  }
}
