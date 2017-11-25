import { Component, OnInit, Input } from '@angular/core';
import { SearchFacet } from '../../model/search-facet';

@Component({
  selector: 'app-search-facets',
  templateUrl: './search-facets.component.html',
  styleUrls: ['./search-facets.component.css']
})
export class SearchFacetsComponent implements OnInit {

  @Input() facets : SearchFacet[] = [];

  constructor() { }
   

  ngOnInit() {

  }

}
