import { Component, OnInit, Input, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import {FacadeService} from '../../service/facade.service';
import {Staff} from '../../model/staff.model';
import {Business} from '../../model/business.model';
import {Slots} from '../../model/slots.model';

import { AppointmentSlot } from '../../model/appointment-slot.model';

@Component({
  selector: 'app-available-slots',
  templateUrl: './available-slots.component.html',
  styleUrls: ['./available-slots.component.css']
})
export class AvailableSlotsComponent implements OnInit {

  staff : Staff;
  @Input() business : Business;
  slots : AppointmentSlot[] = [];
  displaySlots : AppointmentSlot[] = [];
  size : number = 9;
  offset : number = 0;
  prevOffset : number = 0;
  havePrevSlots : boolean = false;
  haveNextSlots : boolean = false;
  dateSelected;
  public error : boolean = false;
  public errorMessage : string = "";
  rows : number[] = [0, 1, 2];
  slotsLoaded: boolean = false;
  

  constructor(private route: ActivatedRoute,
    private router: Router,
    private facadeService : FacadeService) { }

  ngOnInit() {
    this.staff = this.business.staff[0];
    this.facadeService.getAppointmentSlots(this.business, this.staff, 
      null).subscribe(
        (appointmentSlots : AppointmentSlot[]) => {
          this.slots = appointmentSlots;
          this.displaySlots = this.slots.slice(this.offset, this.offset+this.size);
          this.slotsLoaded = true;
          this.showhideMoreSlots();
          this.prevOffset = this.offset;
          this.offset = this.offset+this.size;
        },
        (error : string) => {
          this.error = true;
          this.errorMessage = "Yikes!!! something cramped our service "+error;
        }
    );
    this.dateSelected = {"day":"10", "month":"01", "year":"2018"};
  }



  bookAppointment(bookingId : string){
    //[routerLink]="['/reviewbooking', business.bus_id, staff.staff_id, slot.bookingId]" 
    this.router.navigate(['/reviewbooking', this.business.bus_id, this.staff.staff_id, bookingId],
        {relativeTo:this.route});
    this.facadeService.triggerBusinessSubject(this.business);
  }

  moreNextSlots(){
    this.displaySlots = this.slots.slice(this.offset, this.offset+this.size); 
    this.showhideMoreSlots();
    this.showHidePrevSlots();
    this.prevOffset = this.offset;    
    this.offset += this.size;
  }

  morePrevSlots(){
    this.displaySlots = this.slots.slice(this.prevOffset-this.size, this.size);
    this.showHidePrevSlots();
    this.showhideMoreSlots();
    this.offset = this.prevOffset;
    this.prevOffset -= this.size;
    
  }

  showhideMoreSlots(){
    if(this.offset + this.size  >= this.slots.length){
      this.haveNextSlots = false;
    }
    else{
      this.haveNextSlots = true;
    }
  }

  showHidePrevSlots(){
    if(this.offset <= 0){
      this.havePrevSlots = false;
    }
    else{
      this.havePrevSlots = true;
    }
  }

  onChangeStaff(staffSelected : Staff){
      this.staff = staffSelected;
      this.offset = 0;
      this.prevOffset = 0;
      this.facadeService.getAppointmentSlots(this.business, this.staff, 
      this.getSelectedDate()).subscribe(
        (appointmentSlots : AppointmentSlot[]) => {
          this.slots = appointmentSlots;
          this.displaySlots = this.slots.slice(this.offset, this.offset+this.size);
          this.showhideMoreSlots();
          this.showHidePrevSlots();
          this.prevOffset = this.offset;
          this.offset = this.offset+this.size;
        },
        (error : string) => {
          this.error = true;
          this.errorMessage = "Yikes!!! something cramped our service "+error;
        }
      );
  }

  /* onDateChange(date: NgbDateStruct){
      this.offset = 0;
      this.prevOffset = 0;
      this.facadeService.getAppointmentSlots(this.business, this.staff, 
          this.getSelectedDate()).subscribe(
            (appointmentSlots : AppointmentSlot[]) => {
              this.slots = appointmentSlots;
              this.displaySlots = this.slots.slice(this.offset, this.offset+this.size);
              this.showhideMoreSlots();
              this.showHidePrevSlots();
              this.prevOffset = this.offset;
              this.offset = this.offset+this.size;
            },
            (error : string) => {
              this.error = true;
              this.errorMessage = "Yikes!!! something cramped our service "+error;
            }
      );
      
  } */

  getSelectedDate(){
    return new Date(this.dateSelected.year,this.dateSelected.month, this.dateSelected.day);
  }
}
