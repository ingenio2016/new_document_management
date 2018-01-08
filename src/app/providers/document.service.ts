import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DocumentService {
  // FireBase Collections
  documentsCollection: AngularFirestoreCollection<any>;
  documentsObs: Observable<any>;
  private documents: any[] = [];
  private isSearch = false;
  constructor( private db: AngularFirestore ) {
    this.documentsCollection = this.db
      .collection<any>('documents', ref => ref.orderBy('date', 'desc'));
    this.documentsObs = this.documentsCollection.valueChanges();
  }
  loadMessages() {
    return this.documentsCollection.valueChanges()
      .map((docs: any[]) => {
        this.documents = [];
        for (const doc of docs){
          this.documents.unshift(doc);
        }
        return this.documents;
      });
  }

  searchDocument( term: string ) {
    this.loadMessages();
    let documentsArray: any[] = [];
    term = term.toLowerCase();
    if (term === '') {
      documentsArray = this.documents;
    }else {
      for (const document of this.documents){
        const name = document.name.toLowerCase();
        if ( name.indexOf( term ) >= 0) {
          documentsArray.push(document);
        }

        const description = document.description.toLowerCase();
        if ( description.indexOf( term ) >= 0) {
          documentsArray.push(document);
        }

        const author = document.author.toLowerCase();
        if ( author.indexOf( term ) >= 0) {
          documentsArray.push(document);
        }

        const content = document.content.toLowerCase();
        if ( content.indexOf( term ) >= 0) {
          documentsArray.push(document);
        }
      }
    }
    if (documentsArray.length === 0){
      documentsArray = this.documents;
    }
    this.isSearch = true;
    return documentsArray;
  }

  getDocument(id: number) {
    return this.documents[id];
  }
}
