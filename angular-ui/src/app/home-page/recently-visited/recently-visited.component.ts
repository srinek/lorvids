import { Component, OnInit } from '@angular/core';
import {FacadeService} from '../../service/facade.service';
import {Business} from '../../model/business.model';

@Component({
  selector: 'app-recently-visited',
  templateUrl: './recently-visited.component.html',
  styleUrls: ['./recently-visited.component.css']
})
export class RecentlyVisitedComponent implements OnInit {

  public recentlyVisitedBusiness : Business[] = [];

  constructor(private facadeService : FacadeService) { }

  ngOnInit() {
    this.recentlyVisitedBusiness = this.facadeService.getTrendingBusiness();
  }

}
