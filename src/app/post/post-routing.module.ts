import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PostComponent } from './post.component';
import { PostListComponent } from './post-list/post-list.component';
import { PostCreateComponent } from './post-create/post-create.component';
import { ManagePostsComponent } from './manage-posts/manage-posts.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { AuthGuard } from '../guards/auth-canActivate.guard';
import { PostEditGuard } from '../guards/post-edit.guard';
import { PostEditComponent } from './post-edit/post-edit.component';

const routes: Routes = [
  {
    path: 'posts', component: PostComponent,
    children: [
      { path: '', component: PostListComponent },
      { path: 'new', component: PostCreateComponent, canActivate: [AuthGuard] },
      { path: 'manage', component: ManagePostsComponent, canActivate: [AuthGuard] },
      { path: ':postId/details', component: PostDetailComponent },
      { path: ':postId/edit', component: PostEditComponent, canActivate: [AuthGuard, PostEditGuard] }
    ]
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostRoutingModule { }
