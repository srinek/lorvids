import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

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
  public filterBy : Map<string, string[]> = new Map<string, string[]>();
  public error : boolean = false;
  public errorMessage : string = "";
  
  constructor(private facadeService : FacadeService,
              private route : ActivatedRoute,
              private router : Router
              ) {

  }

  ngOnInit() {
    this.route.queryParamMap.subscribe(
      (paramMap: ParamMap) => {
         this.searchTerm = paramMap.get('look_for');
         paramMap.keys.forEach((key) => {
            if(key === 'look_for'){
              return;
            }
            this.filterBy.set(key, paramMap.getAll(key));
         })
         console.log("searchFor "+this.searchTerm);
         this.facadeService.getFacetedSearchResults(this.searchTerm, this.filterBy)
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
