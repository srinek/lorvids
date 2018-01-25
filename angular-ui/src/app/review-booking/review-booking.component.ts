import { Component, OnInit, ViewChild } from '@angular/core';
import {ActivatedRoute, Router, Params} from '@angular/router';
import { NgForm } from '@angular/forms';

import {FacadeService} from '../service/facade.service';
import {Logger} from '../service/logger.service';
import {Business} from '../model/business.model';
import {Staff} from '../model/staff.model';

@Component({
  selector: 'app-book-appointment',
  templateUrl: './review-booking.component.html',
  styleUrls: ['./review-booking.component.css']
})
export class ReviewBookingComponent implements OnInit {

  business : Business;
  staff : Staff;
  bookingId : string;
  public error : boolean = false;
  public errorMessage : string = "";
  @ViewChild('appointmentForm') appointmentForm : NgForm;
  svcSelected : string;
  bookingTime : Date = new Date();

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
    let user : any = {};
    user.UserEmail = this.appointmentForm.value.uemail;
    user.name = this.appointmentForm.value.uname;
    user.phone = this.appointmentForm.value.uphone;
    let appointment : any = {};
    appointment.staffId = this.staff.staff_id;
    appointment.userEmail = this.appointmentForm.value.uemail;
    appointment.AppointmentId = this.bookingId;
    appointment.busId = this.business.bus_id;
    appointment.location = this.business.address;
    appointment.time = this.bookingTime;
    if(this.appointmentForm.value.splInstr){
      appointment.notes = this.appointmentForm.value.splInstr;
    }
    appointment.service = this.svcSelected;
    apptData.user = user;
    apptData.appt = appointment;

    this.facadeService.saveAppointment(apptData).subscribe(
      (success : string) => {
        this.logger.log(success);
        this.router.navigate(
          ['/confirm', this.business.bus_id, this.staff.staff_id, this.bookingId ],
          {relativeTo:this.route}
        );
      },
      (error : string) => {
        this.error = true;
        this.errorMessage = "Yikes!!! something cramped our service. Please contact "+this.business.phone;
      }
    )

    
  }
}
