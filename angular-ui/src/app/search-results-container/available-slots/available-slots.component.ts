import { Component, OnInit, Input, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import {FacadeService} from '../../service/facade.service';
import {Staff} from '../../model/staff.model';
import {Business} from '../../model/business.model';
import {Slots} from '../../model/slots.model';
import { NgbDatepicker } from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker';
import { NgbInputDatepicker } from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker-input';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date-struct';

@Component({
  selector: 'app-available-slots',
  templateUrl: './available-slots.component.html',
  styleUrls: ['./available-slots.component.css']
})
export class AvailableSlotsComponent implements OnInit {

  staff : Staff;
  @Input() business : Business;
  slots : Slots;
  size : number = 15;
  offset : number = 0;
  havePrevSlots : boolean = false;
  haveNextSlots : boolean = true;
  dateSelected;
  @ViewChild('dp') datePicker : NgbInputDatepicker;
  

  constructor(private route: ActivatedRoute,
    private router: Router,
    private facadeService : FacadeService) { }

  ngOnInit() {
    this.staff = this.business.staff[0];
    this.slots = this.facadeService.getAppointmentSlots(this.business, this.staff, 
      null, this.offset, this.size);
    this.showhideMoreSlots();
    this.dateSelected = {"day":"10", "month":"01", "year":"2018"};
  }



  bookAppointment(bookingId : string){
    //[routerLink]="['/reviewbooking', business.bus_id, staff.staff_id, slot.bookingId]" 
    this.router.navigate(['/reviewbooking', this.business.bus_id, this.staff.staff_id, bookingId],
        {relativeTo:this.route});
    this.facadeService.triggerBusinessSubject(this.business);
  }

  moreNextSlots(){
    this.slots = this.facadeService.getAppointmentSlots(this.business, this.staff, 
      this.getSelectedDate(), this.offset+this.size, this.size);
    this.showhideMoreSlots();
    this.offset += this.size;
    this.showHidePrevSlots();
  }

  morePrevSlots(){
    this.slots = this.facadeService.getAppointmentSlots(this.business, this.staff, 
      this.getSelectedDate(), this.offset-this.size, this.size);
    this.offset -= this.size;
    this.showHidePrevSlots();
    this.showhideMoreSlots();
  }

  showhideMoreSlots(){
    if(this.slots.slots.length < this.size){
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
     this.slots = this.facadeService.getAppointmentSlots(this.business, this.staff, 
      this.getSelectedDate(), this.offset, this.size);
     this.showhideMoreSlots();
     this.showHidePrevSlots();
  }

  onDateChange(date: NgbDateStruct){
      this.slots = this.facadeService.getAppointmentSlots(this.business, this.staff, 
        this.getSelectedDate(), this.offset, this.size);
      this.showhideMoreSlots();
      this.showHidePrevSlots();
  }

  getSelectedDate(){
    return new Date(this.dateSelected.year,this.dateSelected.month, this.dateSelected.day);
  }
}
