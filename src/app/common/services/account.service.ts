import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
//import { firestore } from 'firebase/app';
import * as firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Account } from '../models/account.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  response: any;
  accountCollection: AngularFirestoreCollection<Account>;
  accounts: Observable<Account[]>;
  account: Observable<Account>;
  accountDocument: AngularFirestoreDocument<Account>;

  constructor(private afs: AngularFirestore) { this.accountCollection = this.afs.collection('accounts'); }

  getAccounts(): Observable<Account[]> {
    var accountRef = this.afs.collection<Account>('accounts', ref => ref.orderBy('creationDate', 'desc'));

    return (this.accounts = accountRef.snapshotChanges().pipe(
      map((actions) =>
        actions.map((a) => {
          const data = a.payload.doc.data() as Account;
          data.id = a.payload.doc.id;
          return data;
        })
      )
    ));
  }

  getAccountById(id: string) {
    console.log("getAccountById", id);
    this.accountDocument = this.afs.doc(`accounts/${id}`);
    return this.accountDocument.valueChanges();
  }

  getAccountByUid(uid: string): Observable<Account[]> {
    console.log("getAccountById", uid);
    var accountRef = this.afs.collection<Account>('accounts', ref => ref.where('uid', '==', uid).limit(1));
    return (this.accounts = accountRef.snapshotChanges().pipe(
      map((actions) =>
        actions.map((a) => {
          const data = a.payload.doc.data() as Account;
          data.id = a.payload.doc.id;
          return data;
        })
      )
    ));
  }

  setAccount(account: Account) {

    const id = this.afs.createId();
    if (!account.id) {

      account.id = id;
    }
    account.creationDate = new Date();
    account.modificationDate = new Date();
    return this.accountCollection.doc(account.id).set(account, { merge: true });
  }

  deleteAccount(account: Account) {
    this.accountDocument = this.afs.doc(`accounts/${account.id}`);
    return this.accountDocument.delete();
  }

  updateAccount(account: Account) {
    account.modificationDate = new Date();
    this.accountDocument = this.afs.doc(`accounts/${account.id}`);
    return this.accountDocument.update(account);
  }




}
