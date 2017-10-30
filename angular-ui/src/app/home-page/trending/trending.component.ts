import { Component, OnInit } from '@angular/core';
import {FacadeService} from '../../service/facade.service';
import {Business} from '../../model/business.model';

@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.css']
})
export class TrendingComponent implements OnInit {

  public trendingBusiness : Business[] = [];

  constructor(private facadeService : FacadeService) { }

  ngOnInit() {
     this.trendingBusiness = this.facadeService.getTrendingBusiness();
  }

  // public getTrendingBusiness() : Business[] {
  //   return this.appointmentService.getTredingBusiness();
  // }
}
