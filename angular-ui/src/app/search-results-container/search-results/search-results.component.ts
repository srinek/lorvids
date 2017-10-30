import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { FacadeService} from '../../service/facade.service';
import {Business} from '../../model/business.model';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  public searchResults : Business[] = [];
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
                (searchResults : Business[]) => {
                    this.searchResults = searchResults;
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
