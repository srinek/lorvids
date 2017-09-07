import { Component, OnInit } from '@angular/core';

import { AppointmentService} from '../service/appointment.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(private appointmentService : AppointmentService) { }

  ngOnInit() {
      this.appointmentService.triggerMainPageLoaded();
  }

}
