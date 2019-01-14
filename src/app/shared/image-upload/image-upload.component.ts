import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent implements OnInit {
  selectedFile;
  status: string;

  @Output() imageUploaded = new EventEmitter();
  @Output() imageError = new EventEmitter();

  @Input() existedImage: string;

  constructor() {}

  ngOnInit() {}

  private onSuccess(imageUrl) {
    this.status = 'OK';
    this.imageUploaded.emit(imageUrl);
  }

  private onFailure() {
    this.status = 'FAIL';
    this.imageError.emit('');
  }

  processFile(imageInput) {
    const file: File = imageInput.files[0];

    const reader = new FileReader();

    if (file) {
      this.checkFileType(file) ? reader.readAsDataURL(file) : this.onFailure();
    } else {
      return;
    }

    reader.onload = () => {
      this.selectedFile = reader.result;
      this.existedImage = undefined;
      this.onSuccess(file);
    };
  }

  checkFileType(file: File): boolean {
    if (
      file.type === 'image/jpeg' ||
      file.type === 'image/jpg' ||
      file.type === 'image/png'
    ) {
      return true;
    }
    this.selectedFile = undefined;
    this.existedImage = undefined;
    return false;
  }
}
