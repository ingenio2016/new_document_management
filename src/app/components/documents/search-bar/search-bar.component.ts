import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DocumentService } from "../../../providers/document.service"

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  constructor( private _router:Router, private _documentService: DocumentService ) { }

  ngOnInit() {
  }

  searchDocument(text:string){
    this._router.navigate( ['documents/search', text] );
  }

}
