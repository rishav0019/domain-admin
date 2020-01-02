import { Order } from "./../models/order.model";
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
export class OrderService {
  orderCollection: AngularFirestoreCollection<Order>;

  constructor(private afs: AngularFirestore) {
    this.orderCollection = this.afs.collection("orders");
  }

  getOrders(): Observable<Order[]> {
    var orderRef = this.afs.collection<Order>("orders", ref =>
      ref.orderBy("creationDate", "desc")
    );

    return orderRef.snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as Order;
          data.id = a.payload.doc.id;
          //  console.log("getOrders->docId", data.id);
          return data;
        })
      )
    );
  }

  getOrderById(id: string): Observable<Order> {
    var orderDocument: AngularFirestoreDocument<Order>;
    orderDocument = this.afs.doc(`orders/${id}`);
    return orderDocument.valueChanges();
  }

  addOrder(order: Order) {
    order.id = this.afs.createId();
    order.creationDate = new Date();
    order.modificationDate = new Date();

    return this.orderCollection.doc(order.id).set(order, { merge: true });
  }

  updateOrder(order: Order) {
    order.modificationDate = new Date();
    var orderDocument: AngularFirestoreDocument<Order>;
    orderDocument = this.afs.doc(`orders/${order.id}`);
    return orderDocument.update(order);
  }

  deleteOrder(id) {
    var orderDocument: AngularFirestoreDocument<Order>;
    orderDocument = this.afs.doc(`orders/${id}`);
    return orderDocument.delete();
  }
}
