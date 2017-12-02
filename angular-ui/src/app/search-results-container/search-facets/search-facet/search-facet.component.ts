import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SearchFacet } from '../../../model/search-facet';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap/dropdown/dropdown-config';
import { FacadeService } from '../../../service/facade.service';

@Component({
  selector: 'app-search-facet',
  templateUrl: './search-facet.component.html',
  styleUrls: ['./search-facet.component.css']
})
export class SearchFacetComponent implements OnInit {

  @Input() facet : SearchFacet;
  selectedFacets : string[] = [] ;
  @Input() searchTerm : string = "";
  

  constructor(private config: NgbDropdownConfig, 
    private route: ActivatedRoute,
    private router: Router) {
    config.autoClose = false;
  }

  ngOnInit() {
      console.log("facet ", this.facet);
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
    console.log("this.selectedFacets ", this.selectedFacets);
  }

  findIndexOfUnSelectedValue(facetValue){
    return this.selectedFacets.findIndex((eachVal) => eachVal === facetValue);
  }

  onClickApply(facetName) {
     //this.facadeService.getFacetedSearchResults("", facetName, this.selectedFacets)
     console.log(facetName);
     var fName : string = "" + facetName;
     console.log("fname:", fName);
     var qp = {}
     qp["look_for"] = this.searchTerm;
     qp[fName] = this.selectedFacets;
     console.log("qp:", qp);
     this.router.navigate(['/search'],{relativeTo:this.route, queryParams : qp});
  }
  
}
