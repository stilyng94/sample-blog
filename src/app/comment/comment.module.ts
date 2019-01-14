import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentCreateComponent } from './comment-create/comment-create.component';
import { CommentListComponent } from './comment-list/comment-list.component';
import { CommentRoutingModule } from './comment-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [CommentCreateComponent, CommentListComponent],
  imports: [
    CommonModule,
    FormsModule,
    CommentRoutingModule
  ],
  exports: [CommentCreateComponent, CommentListComponent]
})
export class CommentModule { }
