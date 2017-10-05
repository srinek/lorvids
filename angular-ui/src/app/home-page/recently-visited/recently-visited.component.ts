import { Component, OnInit } from '@angular/core';
import {AppointmentService} from '../../service/appointment.service';
import {Business} from '../../model/business.model';

@Component({
  selector: 'app-recently-visited',
  templateUrl: './recently-visited.component.html',
  styleUrls: ['./recently-visited.component.css']
})
export class RecentlyVisitedComponent implements OnInit {

  public recentlyVisitedBusiness : Business[] = [];

  constructor(private appointmentService : AppointmentService) { }

  ngOnInit() {
    this.recentlyVisitedBusiness = this.appointmentService.getTrendingBusiness();
  }

}
