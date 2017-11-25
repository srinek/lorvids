import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { FacadeService} from '../../service/facade.service';
import {Business} from '../../model/business.model';
import { SearchVO } from '../../model/search-vo';
import { SearchFacet } from '../../model/search-facet';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  public searchResults : Business[] = [];
  public facets : SearchFacet[] = [];
  public searchTerm : string = "";
  public error : boolean = false;
  public errorMessage : string = "";
  
  constructor(private facadeService : FacadeService,
              private route : ActivatedRoute,
              private router : Router
              ) {

  }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
         this.searchTerm = params['searchFor'];
         console.log("searchFor "+this.searchTerm);
         this.facadeService.getSearchResults(this.searchTerm)
            .subscribe(
                (searchVo : SearchVO) => {
                    this.searchResults = searchVo.searchResults;
                    this.facets = searchVo.facets;
                },
                (error : string) => {
                  this.error = true;
                  this.errorMessage = "Yikes!!! something cramped our service "+error;
                }
            )
      }
    );
    
  }


}
