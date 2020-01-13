import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { SearchWord } from '../models/domain.model';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class SearchWordService {

  searchCollection: AngularFirestoreCollection<SearchWord>;
  searches: Observable<SearchWord[]>;
  searchDocument: AngularFirestoreDocument<SearchWord>;
  db = firebase.firestore();


  constructor(private afs: AngularFirestore) {
    this.searchCollection = this.afs.collection('searchTerms');
  }

  setSearchWord(searchTerm: SearchWord) {
    const id = this.afs.createId();
    searchTerm.id = id;
    searchTerm.creationDate = new Date();
    return this.searchCollection.doc(id).set(searchTerm);
  }

  updateSearchWord(searchTerm: SearchWord) {
    this.searchDocument = this.afs.doc(`searchTerms/${searchTerm.id}`);
    return this.searchDocument.update(searchTerm);

  }

  // getSearchWordsByTerm(term: string) {

  //   return this.db.collection("searchTerms").where('term', '==', term)
  //     .get();

  // }

  getSearchWords() {
    var searchRef = this.afs.collection<SearchWord>('searchTerms', ref => ref.orderBy('creationDate', 'desc'));

    return (this.searches = searchRef.snapshotChanges().pipe(
      map((actions) =>
        actions.map((a) => {
          const data = a.payload.doc.data() as SearchWord;
          data.id = a.payload.doc.id;
          return data;
        })
      )
    ));
  }


  getMonthlySearches() {
    var date = new Date();
    date.setMonth(date.getMonth() - 1);

    var searchRef = this.afs.collection<SearchWord>('searchTerms', ref => ref.where('creationDate', '>=', date));

    return (this.searches = searchRef.snapshotChanges().pipe(
      map((actions) =>
        actions.map((a) => {
          const data = a.payload.doc.data() as SearchWord;
          data.id = a.payload.doc.id;
          return data;
        })
      )
    ));
  }



}
