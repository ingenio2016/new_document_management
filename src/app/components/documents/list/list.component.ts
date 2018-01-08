import { Component, OnInit } from '@angular/core';
import { DocumentService } from "../../../providers/document.service"

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  private documents: any[] = [];
  private asc = true;

  constructor( private _ds: DocumentService) {
  }

  ngOnInit() {
    this._ds.loadMessages().subscribe( () => {
    })
  }
}
