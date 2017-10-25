import { Component, OnInit, Input, Output } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

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

  constructor(private route: ActivatedRoute,
    private router: Router,
    private appointmentService : AppointmentService) { }

  ngOnInit() {
     this.slots = this.appointmentService.getAppointmentSlots(this.business, this.staff);
  }

  bookAppointment(){
    //[routerLink]="['/reviewbooking', business.bus_id, staff.staff_id, slot.bookingId]" 
    this.router.navigate(['/reviewbooking', this.business.bus_id, this.staff.staff_id, ""],
        {relativeTo:this.route});
    this.appointmentService.triggerBusinessSubject(this.business);
  }

}
