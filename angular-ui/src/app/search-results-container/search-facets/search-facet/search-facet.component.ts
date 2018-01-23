import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SearchFacet } from '../../../model/search-facet';

import { FacadeService } from '../../../service/facade.service';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown/bs-dropdown.config';

@Component({
  selector: 'app-search-facet',
  templateUrl: './search-facet.component.html',
  styleUrls: ['./search-facet.component.css'],
  providers: [{ provide: BsDropdownConfig, useValue: { autoClose: false } }]
})
export class SearchFacetComponent implements OnInit {

  @Input() facet : SearchFacet;
  selectedFacets : string[] = [] ;
  @Input() searchTerm : string = "";
  

  constructor(
    private route: ActivatedRoute,
    private router: Router) {

  }

  ngOnInit() {
      //console.log("facet ", this.facet);
  }

  onClickFacetValue(facetValue, facetChecked) {
    console.log("inputs ", facetValue, facetChecked);
    if(facetChecked){
      this.selectedFacets.push(facetValue);
    }
    else{
      var elemIndex = this.findIndexOfUnSelectedValue(facetValue);
      this.selectedFacets.splice(elemIndex, 1);
    }
    //console.log("this.selectedFacets ", this.selectedFacets);
  }

  findIndexOfUnSelectedValue(facetValue){
    return this.selectedFacets.findIndex((eachVal) => eachVal === facetValue);
  }

  onClickApply(facetName) {
     var qp = {}
     qp["look_for"] = this.searchTerm;
     qp[facetName] = this.selectedFacets;
     this.router.navigate(['/search'],{relativeTo:this.route, queryParams : qp});
  }
  
}
