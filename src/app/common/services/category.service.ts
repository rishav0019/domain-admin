import { Injectable } from '@angular/core';
import { Category } from '../models/category.model';
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categoryCollection: AngularFirestoreCollection<Category>;

  constructor(private afs: AngularFirestore) {
    this.categoryCollection = this.afs.collection("categories");
  }

  getCategories(): Observable<Category[]> {
    var categoryRef = this.afs.collection<Category>("categories", ref =>
      ref.orderBy("creationDate", "desc")
    );

    return categoryRef.snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as Category;
          data.id = a.payload.doc.id;
          //  console.log("getCategories->docId", data.id);
          return data;
        })
      )
    );
  }

  getCategoryById(id: string): Observable<Category> {
    var categoryDocument: AngularFirestoreDocument<Category>;
    categoryDocument = this.afs.doc(`categories/${id}`);
    return categoryDocument.valueChanges();
  }

  // getCategoryByInvoiceNo(invoiceNo: string): Observable<Category[]> {
  //   var categoryDocument: AngularFirestoreDocument<Category>;

  //   var categoryRef = this.afs.collection<Category>("categories", ref =>
  //     ref.where("invoiceNumber", "==", invoiceNo).limit(1)
  //   );

  //   return categoryRef.snapshotChanges().pipe(
  //     map(actions =>
  //       actions.map(a => {
  //         const data = a.payload.doc.data() as Category;
  //         data.id = a.payload.doc.id;
  //         console.log("getCategoryByInvoiceNo->docId", data.id);
  //         return data;
  //       })
  //     )
  //   );
  // }

  addCategory(category: Category) {
    category.id = this.afs.createId();
    category.creationDate = new Date();
    category.modificationDate = new Date();

    return this.categoryCollection.doc(category.id).set(category, { merge: true });
  }

  updateCategory(category: Category) {
    category.modificationDate = new Date();
    var categoryDocument: AngularFirestoreDocument<Category>;
    categoryDocument = this.afs.doc(`categories/${category.id}`);
    return categoryDocument.update(category);
  }

  deleteCategory(id) {
    var categoryDocument: AngularFirestoreDocument<Category>;
    categoryDocument = this.afs.doc(`categories/${id}`);
    return categoryDocument.delete();
  }
}
