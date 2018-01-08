import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DocumentService } from '../../../providers/document.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  documents:any[] = [];
  term:string = "";
  type:string = "";
  private asc = true;
  constructor( private _activatedRoute:ActivatedRoute, private _documentService:DocumentService ) {
    this._activatedRoute.params.subscribe(params=> {
      this.documents = this._documentService.searchDocument(params['text']);
      this.term = params['text'];
    })
  }

  ngOnInit() {
  }
}
