import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { RandomImage } from '../models/randomImage.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RamdomImageService {

 
  imageCollection: AngularFirestoreCollection<RandomImage>;

  constructor(private afs: AngularFirestore) {
    this.imageCollection = this.afs.collection("random_image");
  }

  getRandomImages(): Observable<RandomImage[]> {
    var imageRef = this.afs.collection<RandomImage>("random_image", ref =>
      ref.orderBy("creationDate", "desc")
    );

    return imageRef.snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as RandomImage;
          data.id = a.payload.doc.id;
          //  console.log("getImages->docId", data.id);
          return data;
        })
      )
    );
  }

  getImageById(id: string): Observable<RandomImage> {
    var imageDocument: AngularFirestoreDocument<RandomImage>;
    imageDocument = this.afs.doc(`random_image/${id}`);
    return imageDocument.valueChanges();
  }


  addImage(image: RandomImage) {
    image.id = this.afs.createId();
    image.creationDate = new Date();
    image.modificationDate = new Date();

    return this.imageCollection.doc(image.id).set(image, { merge: true });
  }


  deleteImage(id) {
    var imageDocument: AngularFirestoreDocument<RandomImage>;
    imageDocument = this.afs.doc(`random_image/${id}`);
    return imageDocument.delete();
  }
}
