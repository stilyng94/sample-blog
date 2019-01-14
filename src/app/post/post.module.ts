import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PostRoutingModule } from './post-routing.module';
import { CommentModule } from '../comment/comment.module';
import { ImageUploadComponent } from '../shared/image-upload/image-upload.component';

import { PostListComponent } from './post-list/post-list.component';
import { PostItemComponent } from './post-item/post-item.component';
import { PostComponent } from './post.component';
import { PostCreateComponent } from './post-create/post-create.component';
import { ManagePostsComponent } from './manage-posts/manage-posts.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { PostEditComponent } from './post-edit/post-edit.component';

@NgModule({
  declarations: [PostListComponent, PostItemComponent,
    PostComponent, PostCreateComponent,
    ImageUploadComponent, ManagePostsComponent,
    PostDetailComponent,
    PostEditComponent],
  imports: [
    CommonModule,
    FormsModule,
    PostRoutingModule,
    CommentModule
  ]
})
export class PostModule { }
