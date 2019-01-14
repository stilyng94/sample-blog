import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ImageUploadService {
  constructor(private http: HttpClient) { }

  uploadImage(image: File): Observable<any> {
    const imageData = new FormData;
    imageData.append('image', image);
    return this.http.post(environment.imageUploadUrl, imageData);
  }
}
