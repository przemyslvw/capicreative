import { Injectable } from '@angular/core';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from '@angular/fire/storage';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  private storage = getStorage();

  uploadPhoto(file: File): Observable<string> {
    const storageRef = ref(this.storage, `photos/${Date.now()}_${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Observable((observer) => {
      uploadTask.on(
        'state_changed',
        null,
        (error) => observer.error(error),
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          observer.next(downloadURL);
          observer.complete();
        }
      );
    });
  }
}
