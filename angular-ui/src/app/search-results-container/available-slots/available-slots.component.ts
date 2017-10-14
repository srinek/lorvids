import { Component, OnInit, Input, Output } from '@angular/core';

import {AppointmentService} from '../../service/appointment.service';
import {Staff} from '../../model/staff.model';
import {Business} from '../../model/business.model';
import {Slots} from '../../model/slots.model';

@Component({
  selector: 'app-available-slots',
  templateUrl: './available-slots.component.html',
  styleUrls: ['./available-slots.component.css']
})
export class AvailableSlotsComponent implements OnInit {

  @Input() staff : Staff;

  @Input() business : Business;

  slots : Slots;

  constructor(private appointmentService : AppointmentService) { }

  ngOnInit() {
     this.slots = this.appointmentService.getAppointmentSlots(this.business, this.staff);
  }

}
