import { Component, OnInit, ViewChild } from '@angular/core';
import {ActivatedRoute, Router, Params} from '@angular/router';
import { NgForm } from '@angular/forms';

import {FacadeService} from '../service/facade.service';
import {Logger} from '../service/logger.service';
import {Business} from '../model/business.model';
import {Staff} from '../model/staff.model';
import { User } from '../model/user.model';
import { AppointmentSlot } from '../model/appointment-slot.model';
import { Appointment } from '../model/appointment.model';

@Component({
  selector: 'app-book-appointment',
  templateUrl: './review-booking.component.html',
  styleUrls: ['./review-booking.component.css']
})
export class ReviewBookingComponent implements OnInit {

  business : Business;
  staff : Staff;
  user : User;
  appointment : Appointment;
  bookingId : string;
  public error : boolean = false;
  public errorMessage : string = "";
  @ViewChild('appointmentForm') appointmentForm : NgForm;
  svcSelected : string;
  bookingTime : Date = new Date();
  apptBooked : boolean = false;

  constructor(
    private facadeService : FacadeService,
    private route : ActivatedRoute,
    private router : Router,
    private logger: Logger
  ) { 

  }

  ngOnInit() {
    this.route.params.subscribe(
      (params : Params) => {
          this.bookingId = params['bookingId'];
          let splitBookingId = this.bookingId.split("-");
          this.bookingTime.setTime(+splitBookingId[splitBookingId.length-1]);
          console.log("bookingTime ", this.bookingTime);
          let staffId = params['staffId'];
          let businessId = params['busId'];
          this.facadeService.getBusiness(businessId, false)
          .subscribe(
              (business : Business) => {
                  this.business = business;
              },
              (error : string) => {
                this.error = true;
                this.errorMessage = "Yikes!!! something cramped our service "+error;
              }
          )
          this.facadeService.getStaff(businessId, staffId)
          .subscribe(
              (staff : Staff) => {
                  this.staff = staff;
              },
              (error : string) => {
                this.error = true;
                this.errorMessage = "Yikes!!! something cramped our service "+error;
              }
          )
          /* this.facadeService.businessSubject.subscribe(
            (business : Business) => {
              this.business = business;
              console.log("business loaded through subject ", this.business);
            },
            (error : string) => {
              this.error = true;
              this.errorMessage = "Yikes!!! something cramped our service "+error;
            }
          ) */
      }
    );
  }

  bookAppointment(){
    let apptData : any = {};
    this.user = new User();
    this.user.UserEmail = this.appointmentForm.value.uemail;
    this.user.name = this.appointmentForm.value.uname;
    this.user.phone = this.appointmentForm.value.uphone;
    this.appointment = new Appointment();
    this.appointment.staffId = this.staff.staff_id;
    this.appointment.userEmail = this.appointmentForm.value.uemail;
    this.appointment.AppointmentId = this.bookingId;
    this.appointment.busId = this.business.bus_id;
    this.appointment.location = this.business.address;
    this.appointment.time = this.bookingTime;
    if(this.appointmentForm.value.splInstr){
      this.appointment.notes = this.appointmentForm.value.splInstr;
    }
    this.appointment.service = this.svcSelected;
    apptData.user = this.user;
    apptData.appt = this.appointment;

    this.facadeService.saveAppointment(apptData).subscribe(
      (success : string) => {
        this.logger.log(success);
        this.apptBooked = true;
        /* this.router.navigate(
          ['/confirm', this.business.bus_id, this.staff.staff_id, this.bookingId ],
          {relativeTo:this.route}
        ); */
      },
      (error : string) => {
        this.error = true;
        this.errorMessage = "Yikes!!! something cramped our service. Please contact "+this.business.phone;
      }
    )

    
  }
}
