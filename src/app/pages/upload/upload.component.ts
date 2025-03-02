import { Component } from '@angular/core';
import { PhotoService } from '../../services/photo.service';

@Component({
  selector: 'app-upload',
  standalone: true,
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent {
  selectedFile?: File;
  uploadProgress = false;
  uploadMessage = '';

  constructor(private photoService: PhotoService) {}

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.selectedFile = target.files[0];
    }
  }

  uploadPhoto() {
    if (!this.selectedFile) return;
    this.uploadProgress = true;
    this.uploadMessage = 'Uploading...';

    this.photoService.uploadPhoto(this.selectedFile).subscribe({
      next: (downloadURL) => {
        this.uploadMessage = 'Upload successful!';
        console.log('Download URL:', downloadURL);
      },
      error: (error) => {
        console.error('Upload error:', error);
        this.uploadMessage = 'Upload failed!';
      },
      complete: () => {
        this.uploadProgress = false;
      }
    });
  }
}
