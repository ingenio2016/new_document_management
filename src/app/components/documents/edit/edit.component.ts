import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DocumentService } from '../../../providers/document.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit, OnDestroy {
  editor;
  private document: any;
  private subscription: any;
  constructor( private _documentService: DocumentService, private _activatedRoute: ActivatedRoute ) {
    this._activatedRoute.params.subscribe( params => {
      if ( params['id'] !== undefined ) {
        this.document = this._documentService.getDocument( params['id'] );
        console.log(this.document);
      }
    });
  }

  ngOnInit() {
    this.subscription = Observable.interval(5000).subscribe(x => {
      console.log('Observable initiated');
    });
  }


  ngOnDestroy() {
    console.log('Observable destroyed');
    this.subscription.unsubscribe();
  }

}
