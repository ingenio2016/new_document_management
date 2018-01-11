import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DocumentService {
  // documents Collections
  documentsCollection: AngularFirestoreCollection<any>;
  // documents Observable
  documentsObs: Observable<any>;
  documentId = '';
  private documents: any[] = [];
  private isSearch = false;
  constructor( private db: AngularFirestore ) {
    this.documentsCollection = this.db
      .collection<any>('documents', ref => ref.orderBy('date', 'desc'));
    this.documentsObs = this.documentsCollection.valueChanges();
  }

  changeSearchState() {
    this.isSearch = false;
  }

  loadMessages() {
    return this.documentsObs
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

  getDocument(id: string) {
    for (const document of this.documents) {
      if ( document.id === id ) {
        return document;
      }
    }
  }

  saveDocument( forma: any ): Promise<any> {
    const promise = new Promise( (resolve, reject) => {
      this.documentId = '';
      this.documentsCollection.add( forma )
        .then((documentRef) => {
          this.documentsCollection.doc(documentRef.id).update({
            id: documentRef.id,
            date: new Date(),
            editDate: new Date()
          }).then((data) => {
            resolve(documentRef.id);
          });
        }).catch((err) => {
        reject(err);
      });
    });
    return promise;
  }

  updateDocument( forma: any ): Promise<any> {
    const promise = new Promise( (resolve, reject) => {
      this.documentsCollection.doc(forma.id).update({
        name: forma.name,
        author: forma.author,
        description: forma.description,
        content: forma.content,
        editDate: new Date()
      }).then((data) => {
        resolve({data: data});
      });
    });
    return promise;
  }

  deleteDocument( documentId: any ): Promise<any> {
    const promise = new Promise( (resolve, reject) => {
      this.documentsCollection.doc(documentId).delete().then(() => {
        resolve(true);
      });
    });
    return promise;
  }
}
