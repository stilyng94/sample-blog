import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';
import { PostModel } from '../models/post.model';

@Injectable({ providedIn: 'root' })
export class PostsService {
  constructor(private http: HttpClient, private router: Router) { }

  getAllPosts(): Observable<any> {
    return this.http.get(environment.postsUrl);
  }

  getUserPosts(): Observable<any> {
    return this.http.get(`${environment.postsUrl}/managePosts`);
  }

  getPost(id: string): Observable<any> {
    return this.http.get(`${environment.postsUrl}/${id}`);
  }

  addPost(post: PostModel): Observable<any> {
    return this.http.post(environment.postsUrl, post);
  }

  updatePost(postData: PostModel ): Observable<any> {
    return this.http.patch(`${environment.postsUrl}/${postData._id}`, postData);
  }

  deletePost(postId: string): Observable<any> {
    return this.http.delete(`${environment.postsUrl}/${postId}`);
  }

  verifyPostEdit(postId: string): Observable<any> {
    return this.http.get(`${environment.postsUrl}/${postId}/verifyEdit`);
  }
}
