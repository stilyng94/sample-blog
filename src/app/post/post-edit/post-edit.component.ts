import { Component, OnInit } from '@angular/core';
import { PostModel } from '../../models/post.model';
import { NgForm } from '@angular/forms';
import { PostsService } from '../../service/post.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { isNullOrUndefined } from 'util';
import { ImageUploadService } from '../../service/image-upload.service';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit {

  existingPost: PostModel;
  imageUploadError = false;
  postId: string;
  newImage: File;
  correctImageUploaded: string;

  constructor(private postService: PostsService, private route: ActivatedRoute, private router: Router,
    private imageService: ImageUploadService) { }

  ngOnInit() {
    this.route.paramMap.subscribe((param: ParamMap) => {
      this.postId = param.get('postId');
    });
    this.postService.getPost(this.postId).subscribe((data) => {
      this.existingPost = data.post;
    });
  }

  onUpdatePost(createPostForm: NgForm) {
    if (createPostForm.invalid) {
      return;
    }
    if (isNullOrUndefined(this.newImage) && isNullOrUndefined(this.existingPost.imagePath)) {
      return;
    }
    if (this.newImage && isNullOrUndefined(this.existingPost)) {
      this.imageService.uploadImage(this.newImage).subscribe((data) => {
        this.correctImageUploaded = data.imageUrl;
        if (isNullOrUndefined(this.correctImageUploaded)) {
          return;
        }
        this.existingPost.imagePath = this.correctImageUploaded;
        this.postService.updatePost(this.existingPost).subscribe(
          () => {
            this.newImage = undefined;
            this.imageUploadError = false;
            this.router.navigate(['/posts', 'manage']);
          },
          err => {
            alert(err);
            return;
          }
        );
      }, (err) => {
        alert(err);
        return;
      });
    }
    if (this.existingPost.imagePath && isNullOrUndefined(this.newImage)) {
      this.postService.updatePost(this.existingPost).subscribe(
        () => {
          this.imageUploadError = false;
          this.router.navigate(['/posts', 'manage']);
        },
        err => {
          alert(err);
          return;
        }
      );
    }
  }

  handleImageUpload(event) {
    this.imageUploadError = false;
    this.newImage = event;
    this.existingPost.imagePath = undefined;
  }

  handleImageError() {
    this.imageUploadError = true;
    this.newImage = undefined;
    this.existingPost.imagePath = undefined;

  }

  onCancel() {
    this.router.navigate(['/posts', 'manage']);
  }

}
