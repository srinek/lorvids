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
  slotsLoaded : boolean = false;
  
  
  constructor(private route: ActivatedRoute,
    private router: Router,
    private facadeService : FacadeService) {

  }

  ngOnInit() {
    this.loadNewSlots(true);
    
  }

  bookAppointment(bookingId : string){
    //[routerLink]="['/reviewbooking', business.bus_id, staff.staff_id, slot.bookingId]" 
    console.log("business ", this.business, this.staff, bookingId);
    this.router.navigate(['/reviewbooking', this.business.bus_id, this.staff.staff_id, bookingId],
        {relativeTo:this.route});
    this.facadeService.triggerBusinessSubject(this.business);
  }

  onDateChange(date: Date){
     this.selectedDate = date;
     this.loadNewSlots(false);
  }

  ngOnChanges(changes : {staff : SimpleChange}){
    //console.log("", changes.staff);
    //console.log("", changes.staff.currentValue);
    this.staff = changes.staff.currentValue;
    this.loadNewSlots(false);
  }

  loadNewSlots(onInit){
    this.slotsLoaded = false;
    this.facadeService.getAppointmentSlots(this.business, this.staff, 
      this.selectedDate).subscribe(
        (appointmentSlots : AppointmentSlot[]) => {
          this.slots = appointmentSlots;
          this.slotsLoaded = true;
          if(onInit && this.slots.length > 0){
            const date = this.slots[0].slotTime;
            this.selectedDate = date;
          }
        },
        (error : string) => {
          this.error = true;
          this.errorMessage = "Yikes!!! something cramped our service "+error;
          this.slots = [];
          this.slotsLoaded = true;
        }
      );
  }
}