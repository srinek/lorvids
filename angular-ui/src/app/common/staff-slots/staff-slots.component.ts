import { Component, OnInit, Input, SimpleChange } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Staff } from '../../model/staff.model';
import { Business } from '../../model/business.model';
import { Slots } from '../../model/slots.model';
import { FacadeService } from '../../service/facade.service';

@Component({
  selector: 'app-staff-slots',
  templateUrl: './staff-slots.component.html',
  styleUrls: ['./staff-slots.component.css']
})
export class StaffSlotsComponent implements OnInit {
  
  @Input() staff : Staff;
  @Input() business : Business;
  slots : Slots;
  selectedDate : Date;
  
  constructor(private route: ActivatedRoute,
    private router: Router,
    private facadeService : FacadeService) { }

  ngOnInit() {
    
    
  }

  bookAppointment(bookingId : string){
    //[routerLink]="['/reviewbooking', business.bus_id, staff.staff_id, slot.bookingId]" 
    this.router.navigate(['/reviewbooking', this.business.bus_id, this.staff.staff_id, bookingId],
        {relativeTo:this.route});
    this.facadeService.triggerBusinessSubject(this.business);
  }

  onDateChange(date: Date){
    this.slots = this.facadeService.getAppointmentSlots(this.business, this.staff, 
      this.selectedDate, 0, 60);
  }

  ngOnChanges(changes : {staff : SimpleChange}){
    //console.log("", changes.staff);
    //console.log("", changes.staff.currentValue);
    this.staff = changes.staff.currentValue;
    this.slots = this.facadeService.getAppointmentSlots(this.business, this.staff, 
      null, 0, 60);
  }
}
