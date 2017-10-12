import { Component, OnInit, Input } from '@angular/core';

import {AppointmentService} from '../../service/appointment.service';
import {Staff} from '../../model/staff.model';
import {Business} from '../../model/business.model';

@Component({
  selector: 'app-available-slots',
  templateUrl: './available-slots.component.html',
  styleUrls: ['./available-slots.component.css']
})
export class AvailableSlotsComponent implements OnInit {

  @Input() staff : Staff;

  @Input() business : Business;

  constructor(private appointmentService : AppointmentService) { }

  ngOnInit() {
     this.appointmentService.getAppointmentSlots(this.business, this.staff);
  }

}
