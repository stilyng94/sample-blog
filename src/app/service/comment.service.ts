import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommentModel } from '../models/comment.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  constructor(private http: HttpClient) {}

  createComment(comment: CommentModel): Observable<any> {
    return this.http.post(environment.commentsUrl, comment);
  }

  getCommentsOfPost(postId: string): Observable<any> {
    return this.http.get(`${environment.commentsUrl}/${postId}`);
  }

  deleteComment(commentId: string): Observable<any> {
    return this.http.delete(`${environment.commentsUrl}/${commentId}`);
  }
}
