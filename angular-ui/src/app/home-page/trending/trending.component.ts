import { Component, OnInit } from '@angular/core';
import {AppointmentService} from '../../service/appointment.service';
import {Business} from '../../model/business.model';

@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.css']
})
export class TrendingComponent implements OnInit {

  public trendingBusiness : Business[] = [];

  constructor(private appointmentService : AppointmentService) { }

  ngOnInit() {
     this.trendingBusiness = this.appointmentService.getTrendingBusiness();
  }

  // public getTrendingBusiness() : Business[] {
  //   return this.appointmentService.getTredingBusiness();
  // }
}
