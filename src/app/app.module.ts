import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';

import { PostModule } from './post/post.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';

import { ServiceErrorInterceptor } from './interceptors/http-error.interceptors';

import { AuthGuard } from './guards/auth-canActivate.guard';
import { PostEditGuard } from './guards/post-edit.guard';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:3000'],
        blacklistedRoutes: [environment.authUrl]
      }
    }),
    PostModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServiceErrorInterceptor,
      multi: true
    },
    AuthGuard,
    PostEditGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
