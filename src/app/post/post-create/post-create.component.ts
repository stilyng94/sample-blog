import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostModel } from '../../models/post.model';
import { PostsService } from '../../service/post.service';
import { Router } from '@angular/router';
import { isNullOrUndefined } from 'util';
import { ImageUploadService } from '../../service/image-upload.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  newPost: PostModel;
  imageUploadError = false;
  private newImage: File;
  private uploadedImageUrl;

  constructor(
    private postService: PostsService,
    private router: Router,
    private imageUploadService: ImageUploadService
  ) { }

  ngOnInit() {
    this.newPost = {};
  }

  onCreatePost(createPostForm: NgForm) {
    if (createPostForm.invalid) {
      return;
    }
    if (isNullOrUndefined(this.newImage)) {
      return;
    }

    this.imageUploadService.uploadImage(this.newImage).subscribe(
      imageUrl => {
        this.uploadedImageUrl = imageUrl.imageUrl;
        if (isNullOrUndefined(this.uploadedImageUrl)) {
          return;
        }

        this.newPost.imagePath = this.uploadedImageUrl;
        this.postService.addPost(this.newPost).subscribe(
          () => {
            this.newImage = undefined;
            this.imageUploadError = false;
            this.newPost = {};
            this.router.navigate(['/posts', 'manage']);
          },
          err => {
            alert(err);
            return;
          }
        );
      },
      err => {
        alert(err);
        this.uploadedImageUrl = undefined;
        return;
      }
    );


  }

  handleImageUpload(event) {
    this.imageUploadError = false;
    this.newImage = event;
  }

  handleImageError() {
    this.imageUploadError = true;
    this.newImage = undefined;
  }
}
