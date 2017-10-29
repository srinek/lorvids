import { Component, OnInit, ViewChild } from '@angular/core';
import {ActivatedRoute, Router, Params} from '@angular/router';
import { NgForm } from '@angular/forms';

import { AppointmentService} from '../service/appointment.service';
import {Logger} from '../service/logger.service';
import {Business} from '../model/business.model';
import {Staff} from '../model/staff.model';

@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.css']
})
export class BookAppointmentComponent implements OnInit {

  business : Business;
  staff : Staff;
  bookingId : string;
  public error : boolean = false;
  public errorMessage : string = "";
  @ViewChild('appointmentForm') appointmentForm : NgForm;

  constructor(
    private appointmentService : AppointmentService,
    private route : ActivatedRoute,
    private router : Router,
    private logger: Logger
  ) { 

  }

  ngOnInit() {
    this.route.params.subscribe(
      (params : Params) => {
          this.bookingId = params['bookingId'];
          let staffId = params['staffId'];
          let businessId = params['busId'];
          this.appointmentService.getBusiness(businessId)
          .subscribe(
              (business : Business) => {
                  this.business = business;
                  console.log(this.business);
              },
              (error : string) => {
                this.error = true;
                this.errorMessage = "Yikes!!! something cramped our service "+error;
              }
          )
          this.appointmentService.getStaff(businessId, staffId)
          .subscribe(
              (staff : Staff) => {
                  this.staff = staff;
                  console.log(this.staff);
              },
              (error : string) => {
                this.error = true;
                this.errorMessage = "Yikes!!! something cramped our service "+error;
              }
          )
          /* this.appointmentService.businessSubject.subscribe(
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
    console.log(this.appointmentForm);
    user.UserEmail = this.appointmentForm.value.uemail;
    user.name = this.appointmentForm.value.uname;
    user.phone = this.appointmentForm.value.uphone;
    let appointment : any = {};
    appointment.StaffId = this.staff.staff_id;
    appointment.UserEmail = this.appointmentForm.value.uemail;
    appointment.apptId = this.bookingId;
    appointment.busId = this.business.bus_id;
    appointment.location = this.business.address;
    if(this.appointmentForm.value.splInstr){
      appointment.notes = this.appointmentForm.value.splInstr;
    }
    appointment.service = "Service Selected";
    apptData.user = user;
    apptData.appt = appointment;

    this.appointmentService.saveAppointment(apptData).subscribe(
      (success : string) => {
        this.logger.log(success);
        this.router.navigate(
          ['/confirm', this.business.bus_id, this.staff.staff_id, this.bookingId ],
          {relativeTo:this.route}
        );
      },
      (error : string) => {
        this.error = true;
        this.errorMessage = "Yikes!!! something cramped our service "+error;
      }
    )

    
  }
}
