import { RandomImage } from "./../models/randomImage.model";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {
  AngularFirestoreCollection,
  AngularFirestore,
  AngularFirestoreDocument
} from "@angular/fire/firestore";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class RandomImageService {
  randomImageCollection: AngularFirestoreCollection<RandomImage>;

  constructor(private afs: AngularFirestore) {
    this.randomImageCollection = this.afs.collection("random_image");
  }

  getRandomImages(): Observable<RandomImage[]> {
    var randomImageRef = this.afs.collection<RandomImage>("random_image", ref =>
      ref.orderBy("creationDate", "desc")
    );

    return randomImageRef.snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as RandomImage;
          data.id = a.payload.doc.id;
          //  console.log("getRandomImages->docId", data.id);
          return data;
        })
      )
    );
  }

  getRandomImageById(id: string): Observable<RandomImage> {
    var randomImageDocument: AngularFirestoreDocument<RandomImage>;
    randomImageDocument = this.afs.doc(`random_image/${id}`);
    return randomImageDocument.valueChanges();
  }


  addRandomImage(randomImage: RandomImage) {
    randomImage.id = this.afs.createId();
    randomImage.creationDate = new Date();
    randomImage.modificationDate = new Date();

    return this.randomImageCollection.doc(randomImage.id).set(randomImage, { merge: true });
  }

  updateRandomImage(randomImage: RandomImage) {
    randomImage.modificationDate = new Date();
    var randomImageDocument: AngularFirestoreDocument<RandomImage>;
    randomImageDocument = this.afs.doc(`random_image/${randomImage.id}`);
    return randomImageDocument.update(randomImage);
  }

  deleteRandomImage(id) {
    var randomImageDocument: AngularFirestoreDocument<RandomImage>;
    randomImageDocument = this.afs.doc(`random_image/${id}`);
    return randomImageDocument.delete();
  }
}
