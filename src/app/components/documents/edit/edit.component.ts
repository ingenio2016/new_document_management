import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DocumentService } from '../../../providers/document.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit, OnDestroy {
  // wyswyg editor value
  editor;

  // document Object to FormControls
  document: Object = {
    id: '',
    name: '',
    description: '',
    author: '',
    content: '',
    date: new Date(),
    editDate: new Date()
  };

  // Timer Observable variable
  private subscription: any;

  // form value
  forma: FormGroup;
  constructor( private _documentService: DocumentService, private _activatedRoute: ActivatedRoute, private _router: Router ) {
    // Form Structure
    this.forma = new FormGroup({
      'id': new FormControl(''),
      'name': new FormControl(''),
      'description': new FormControl(''),
      'author': new FormControl(''),
      'content': new FormControl(''),
      'date': new FormControl(''),
      'editDate': new FormControl('')
    });

    this._activatedRoute.params.subscribe( params => {
      if ( params['id'] !== undefined ) {
        this.document = this._documentService.getDocument( params['id'] );
        if (this.document !== undefined){
          this.forma.setValue(this.document);
        }
      }else {
          this._documentService.saveDocument(this.document).then( (resp) => {
            console.log('Se Creó', resp);
            this._router.navigate( ['documents/edit', resp] );
          });
      }
    });
  }

  ngOnInit() {
    this.subscription = Observable.interval(5000).subscribe(x => {
      console.log('Observable initiated');
      this.saveDocument();
    });
  }


  ngOnDestroy() {
    console.log('Observable destroyed');
    this.subscription.unsubscribe();
  }

  saveDocument() {
    if (this.forma.dirty) {
      if (this.forma.controls['id'].value === '' || this.forma.controls['id'].value === null) {
        this._documentService.saveDocument(this.forma.value).then( (resp) => {
          console.log('Se Creó', resp);
          this._router.navigate( ['documents/edit', resp] );
        });
      }else {
        this._documentService.updateDocument(this.forma.value).then( (resp) => {
          this.document = this._documentService.getDocument( this.forma.value.id );
          this.forma.reset(this.document);
        });
      }
    }
  }

  discard() {
    this.subscription.unsubscribe();
    this._router.navigate( ['documents/list'] );
  }

  delete() {
    this._documentService.deleteDocument(this.forma.value.id).then( () => {
      this.subscription.unsubscribe();
      this._router.navigate( ['documents/list'] );
    });
  }
}
