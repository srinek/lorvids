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
import { ParamMap } from '@angular/router/src/shared';
import { environment } from '../../environments/environment';
import { Service } from '../model/service.model';

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
  //bookingId : string;
  public error : boolean = false;
  public errorMessage : string = "";
  @ViewChild('appointmentForm') appointmentForm : NgForm;
  svcSelected : Service;
  bookingTime : Date = new Date();
  prevSlotId : string;
  updateAppointment : boolean;
  userEmail : string;
  userData : User = new User();
  apptBooked : boolean = false;
  imageRoot : string = environment.imageRoot;

  constructor(
    private facadeService : FacadeService,
    private route : ActivatedRoute,
    private router : Router,
    private logger: Logger
  ) { 

  }

  ngOnInit() {
    
    let lcl_svc;
    this.route.queryParamMap.subscribe(
      (paramMap: ParamMap) => {
        this.bookingTime.setTime(+paramMap.get('sid'));
/*         let splitBookingId = this.bookingId.split("-");
        this.bookingTime.setTime(+splitBookingId[splitBookingId.length-1]); */
        this.prevSlotId = paramMap.get('pid');
        if(this.prevSlotId){
           this.updateAppointment = true;
        }
        lcl_svc = paramMap.get('srvc');
        this.userEmail = paramMap.get('u');
        if(this.userEmail){
          this.loadUser();
        }
        //console.log("bookingTime ", this.bookingTime);
      }
    );

    this.route.params.subscribe(
      (params : Params) => {
        let staffId = params['staffId'];
        let businessId = params['busId'];
        this.facadeService.getBusiness(businessId)
        .subscribe(
            (business : Business) => {
                this.business = business;
                this.staff = this.business.findStaff(staffId);
                this.svcSelected = this.business.findService(lcl_svc);
                if(!this.svcSelected){
                  this.svcSelected = this.business.services[0];
                }
            },
            (error : string) => {
              this.error = true;
              this.errorMessage = "Yikes!!! something cramped our service "+error;
            }
        )
        /* this.facadeService.getStaff(businessId, staffId)
        .subscribe(
            (staff : Staff) => {
                this.staff = staff;
            },
            (error : string) => {
              this.error = true;
              this.errorMessage = "Yikes!!! something cramped our service "+error;
            }
        ) */
      }
    );

    this.facadeService.businessSubject.subscribe(
      (business : Business) => {
        
        console.log("business loaded through subject ", business);
      },
      (error : string) => {
        this.error = true;
        this.errorMessage = "Yikes!!! something cramped our service "+error;
      }
    )
  }

  private loadUser() {
    this.facadeService.getUserDetails(this.userEmail).subscribe( (userData : User) => {
       this.userData = userData;
    });
  }

  saveAppointment(){
    let apptData : any = {};
    this.user = new User();
    this.user.UserEmail = this.appointmentForm.value.uemail;
    this.user.name = this.appointmentForm.value.uname;
    this.user.phone = this.appointmentForm.value.uphone;
    this.appointment = new Appointment();
    this.appointment.staffId = this.staff.staff_id;
    this.appointment.userEmail = this.appointmentForm.value.uemail;
    this.appointment.busId = this.business.bus_id;
    this.appointment.location = this.business.address;
    this.appointment.time = this.bookingTime;
    this.appointment.notes = "NONE";
    if(this.appointmentForm.value.splInstr){
      this.appointment.notes = this.appointmentForm.value.splInstr;
    }
    this.appointment.busName = this.business.bus_name;
    this.appointment.busImage = this.business.defaultImage;
    this.appointment.bus_address = this.business.address;
    this.appointment.bus_phone = this.business.phone+"";
    this.appointment.staffName = this.staff.staff_name;
    this.appointment.staffImage = this.staff.image;
    this.appointment.service = this.svcSelected.name;
    apptData.user = this.user;
    apptData.appt = this.appointment;

    if(this.updateAppointment) {
      this.appointment.AppointmentId = this.prevSlotId;
      this.modifyAppointment(apptData);
    }
    else{
      this.createAppointment(apptData);
    }
  }

  private modifyAppointment(apptData) {
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
    );
  }

  private createAppointment(apptData){
    this.facadeService.createAppointment(apptData).subscribe(
      (success : AppointmentSlot) => {
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
    );
  }
}
