import { Component, OnInit, OnChanges, Input, SimpleChange } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Staff } from '../../model/staff.model';
import { Business } from '../../model/business.model';
import { Slots } from '../../model/slots.model';
import { FacadeService } from '../../service/facade.service';
import { AppointmentSlot } from '../../model/appointment-slot.model';
import { Appointment } from '../../model/appointment.model';
import { User } from '../../model/user.model';

@Component({
  selector: 'app-staff-slots',
  templateUrl: './staff-slots.component.html',
  styleUrls: ['./staff-slots.component.css']
})
export class StaffSlotsComponent implements OnInit, OnChanges {
  
  @Input() staff : Staff;
  @Input() business : Business;
  @Input() previousSlotId : string;
  @Input() pUserEmail : User;
  slots : AppointmentSlot[];
  selectedDate : Date;
  today : Date;
  minDate: Date = void 0;
  public error : boolean = false;
  public errorMessage : string = "";
  slotsLoaded : boolean = false;
  appointment : Appointment;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private facadeService : FacadeService) {

  }

  ngOnInit() {
    //this.minDate = new Date();
    //this.loadNewSlots(true);
    this.today = new Date();
    this.selectedDate = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate());
  }

  bookAppointment(slotTimeInMillis : Date){
    //[routerLink]="['/reviewbooking', business.bus_id, staff.staff_id, slot.bookingId]" 
    //let apptData : any = {};
    /* this.appointment = new Appointment();
    this.appointment.staffId = this.staff.staff_id;
    this.appointment.busId = this.business.bus_id;
    this.appointment.time = slotTimeInMillis;
    apptData.appt = this.appointment;
    this.facadeService.createAppointment(apptData).subscribe(
        (result : AppointmentSlot) => {
        
        this.router.navigate(['/reviewbooking', this.business.bus_id, this.staff.staff_id],
                      {relativeTo:this.route, queryParams : {'sid' : result.appointmentId}});
        this.facadeService.triggerBusinessSubject(this.business);
      },
      (error : string) => {
        this.error = true;
        this.errorMessage = "Yikes!!! something cramped our service. Please contact "+this.business.phone;
      }); */
      //[routerLink]="['/reviewbooking', this.business.bus_id, this.staff.staff_id]"
      this.router.navigate(['/reviewbooking', this.business.bus_id, this.staff.staff_id],
                      {relativeTo:this.route, queryParams : {'sid' : slotTimeInMillis, 'pid':this.previousSlotId,'u':this.pUserEmail}});
  }

  /* onDateChange(date: Date){
    if(this.currentDate.getTime() != this.selectedDate.getTime()){
      this.loadNewSlots(false);
      this.currentDate = this.selectedDate;
    }  
  } */

  nextDate(){
    this.selectedDate.setDate(this.selectedDate.getDate()+1);
    this.loadNewSlots(false);
  }

  previousDate(){
    if(this.selectedDate > this.today){
      this.selectedDate.setDate(this.selectedDate.getDate()-1);
      this.loadNewSlots(false);
    }
  }

  ngOnChanges(changes : {staff : SimpleChange}){
    //console.log("", changes.staff);
    //console.log("", changes.staff.currentValue);
    this.staff = changes.staff.currentValue;
    this.loadNewSlots(true);
  }

  loadNewSlots(onInit){
    this.slotsLoaded = false;
    this.facadeService.getAppointmentSlots(this.business, this.staff, 
      this.selectedDate).subscribe(
        (appointmentSlots : AppointmentSlot[]) => {
          this.slots = appointmentSlots;
          this.slotsLoaded = true;
          if(this.slots.length > 0){
            const date = this.slots[0].slotTime;
            this.selectedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
          }
          else{
            this.selectedDate = new Date(this.selectedDate.getFullYear(), 
            this.selectedDate.getMonth(), 
            this.selectedDate.getDate());
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