import { Component, OnInit, Input, Output } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import {FacadeService} from '../../service/facade.service';
import {Staff} from '../../model/staff.model';
import {Business} from '../../model/business.model';
import {Slots} from '../../model/slots.model';

@Component({
  selector: 'app-available-slots',
  templateUrl: './available-slots.component.html',
  styleUrls: ['./available-slots.component.css']
})
export class AvailableSlotsComponent implements OnInit {

  staff : Staff;

  @Input() business : Business;
  slots : Slots;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private facadeService : FacadeService) { }

  ngOnInit() {
    this.staff = this.business.staff[0];
    this.slots = this.facadeService.getAppointmentSlots(this.business, this.staff);
  }

  bookAppointment(bookingId : string){
    //[routerLink]="['/reviewbooking', business.bus_id, staff.staff_id, slot.bookingId]" 
    this.router.navigate(['/reviewbooking', this.business.bus_id, this.staff.staff_id, bookingId],
        {relativeTo:this.route});
    this.facadeService.triggerBusinessSubject(this.business);
  }

}
