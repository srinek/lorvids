import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { SearchFacet } from '../../model/search-facet';

@Component({
  selector: 'app-search-facets',
  templateUrl: './search-facets.component.html',
  styleUrls: ['./search-facets.component.css']
})
export class SearchFacetsComponent implements OnInit {

  @Input() facets : SearchFacet[] = [];

  @Input() searchTerm : string = "";
   
  constructor() { }
  
  ngOnInit() {

  }

}
