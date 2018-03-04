import { Component, OnInit, OnChanges, Input, Output, ViewChild, SimpleChange, EventEmitter } from '@angular/core';
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
export class AvailableSlotsComponent implements OnInit, OnChanges {

  @Input() staff : Staff;
  @Input() business : Business;
  @Input() selectedDate : Date;
  slots : AppointmentSlot[] = [];
  displaySlots : AppointmentSlot[] = [];
  size : number = 9;
  offset : number = 0;
  prevOffset : number = 0;
  havePrevSlots : boolean = false;
  haveNextSlots : boolean = false;
  public error : boolean = false;
  public errorMessage : string = "";
  rows : number[] = [0, 1, 2];
  slotsLoaded: boolean = false;
  @Output() dateChange : EventEmitter<Date> = new EventEmitter<Date>();
  

  constructor(private route: ActivatedRoute,
    private router: Router,
    private facadeService : FacadeService) { }

  ngOnInit() {
    this.facadeService.getAppointmentSlots(this.business, this.staff, 
      null).subscribe(   // pass date null on init, so we get next available date
        (appointmentSlots : AppointmentSlot[]) => {
          this.slots = appointmentSlots;
          this.displaySlots = this.slots;//.slice(this.offset, this.offset+this.size);
          const date = this.displaySlots[0] && this.displaySlots[0].slotTime;
          this.dateChange.emit(date);
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
  }



  bookAppointment(bookingId : string){
    //[routerLink]="['/reviewbooking', business.bus_id, staff.staff_id, slot.bookingId]" 
    /* this.router.navigate(['/reviewbooking', this.business.bus_id, this.staff.staff_id],
        {relativeTo:this.route}); */
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

  onChangeStaff(){
      this.offset = 0;
      this.prevOffset = 0;
      this.facadeService.getAppointmentSlots(this.business, this.staff, 
      this.selectedDate).subscribe(
        (appointmentSlots : AppointmentSlot[]) => {
          this.slots = appointmentSlots;
          this.displaySlots = this.slots;//.slice(this.offset, this.offset+this.size);
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



  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    console.log("changes",  changes);
    for (let propName in changes) {
      let changedProp = changes[propName];
      if(!changedProp.isFirstChange()){
          this.onChangeStaff();
      }
    }
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
}
