import { Domain } from "./../models/domain.model";
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
export class DomainService {
  domainCollection: AngularFirestoreCollection<Domain>;

  constructor(private afs: AngularFirestore) {
    this.domainCollection = this.afs.collection("domains");
  }

  getDomains(): Observable<Domain[]> {
    var domainRef = this.afs.collection<Domain>("domains", ref =>
      ref.orderBy("creationDate", "desc")
    );

    return domainRef.snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as Domain;
          data.id = a.payload.doc.id;
          //  console.log("getDomains->docId", data.id);
          return data;
        })
      )
    );
  }

  getDomainById(id: string): Observable<Domain> {
    var domainDocument: AngularFirestoreDocument<Domain>;
    domainDocument = this.afs.doc(`domains/${id}`);
    return domainDocument.valueChanges();
  }

  getDomainByInvoiceNo(invoiceNo: string): Observable<Domain[]> {
    var domainDocument: AngularFirestoreDocument<Domain>;

    var domainRef = this.afs.collection<Domain>("domains", ref =>
      ref.where("invoiceNumber", "==", invoiceNo).limit(1)
    );

    return domainRef.snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as Domain;
          data.id = a.payload.doc.id;
          console.log("getDomainByInvoiceNo->docId", data.id);
          return data;
        })
      )
    );
  }

  addDomain(domain: Domain) {
    domain.id = this.afs.createId();
    domain.creationDate = new Date();
    domain.modificationDate = new Date();

    return this.domainCollection.doc(domain.id).set(domain, { merge: true });
  }

  updateDomain(domain: Domain) {
    domain.modificationDate = new Date();
    var domainDocument: AngularFirestoreDocument<Domain>;
    domainDocument = this.afs.doc(`domains/${domain.id}`);
    return domainDocument.update(domain);
  }

  deleteDomain(id) {
    var domainDocument: AngularFirestoreDocument<Domain>;
    domainDocument = this.afs.doc(`domains/${id}`);
    return domainDocument.delete();
  }
}
