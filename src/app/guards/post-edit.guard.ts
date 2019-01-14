import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { PostsService } from '../service/post.service';

@Injectable()
export class PostEditGuard implements CanActivate {

  private url: string;

  constructor(private postService: PostsService, private router: Router) { }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> | Promise<boolean> | boolean {

    const postId = route.params.postId;

    return this.postService.verifyPostEdit(postId).pipe(
      map(() => {
        return true;
      }),
      catchError(err => {
        this.router.navigate(['/posts']);
        return of(false);
      })
    );
  }
}
