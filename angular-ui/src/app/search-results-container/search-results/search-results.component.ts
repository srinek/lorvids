import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { AppointmentService} from '../../service/appointment.service';
import {Business} from '../../model/business.model';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  public searchResults : Business[] = [];
  public searchTerm : string = "";
  
  constructor(private appointmentService : AppointmentService,
              private route : ActivatedRoute,
              private router : Router
              ) {

  }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
         this.searchTerm = params['searchFor'];
         console.log("searchFor "+this.searchTerm);
         this.searchResults = this.appointmentService.getSearchResults(this.searchTerm);
      }
    );
    
  }


}
