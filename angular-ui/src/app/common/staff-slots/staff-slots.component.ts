import { Component, OnInit, Input, SimpleChange } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Staff } from '../../model/staff.model';
import { Business } from '../../model/business.model';
import { Slots } from '../../model/slots.model';
import { FacadeService } from '../../service/facade.service';
import { AppointmentSlot } from '../../model/appointment-slot.model';

@Component({
  selector: 'app-staff-slots',
  templateUrl: './staff-slots.component.html',
  styleUrls: ['./staff-slots.component.css']
})
export class StaffSlotsComponent implements OnInit {
  
  @Input() staff : Staff;
  @Input() business : Business;
  slots : AppointmentSlot[];
  selectedDate : Date;
  public error : boolean = false;
  public errorMessage : string = "";
  
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
     this.facadeService.getAppointmentSlots(this.business, this.staff, 
      this.selectedDate).subscribe(
        (appointmentSlots : AppointmentSlot[]) => {
          this.slots = appointmentSlots;
        },
        (error : string) => {
          this.error = true;
          this.errorMessage = "Yikes!!! something cramped our service "+error;
        }
      );
  }

  ngOnChanges(changes : {staff : SimpleChange}){
    //console.log("", changes.staff);
    //console.log("", changes.staff.currentValue);
    this.staff = changes.staff.currentValue;
    this.facadeService.getAppointmentSlots(this.business, this.staff, 
      null).subscribe(
        (appointmentSlots : AppointmentSlot[]) => {
          this.slots = appointmentSlots;
        },
        (error : string) => {
          this.error = true;
          this.errorMessage = "Yikes!!! something cramped our service "+error;
        }
      );
  }
}
