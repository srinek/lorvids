import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, Params} from '@angular/router';
import { AppointmentService} from '../service/appointment.service';
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
  public error : boolean = false;
  public errorMessage : string = "";

  constructor(
    private appointmentService : AppointmentService,
    private route : ActivatedRoute,
    private router : Router
  ) { 

  }

  ngOnInit() {
    this.route.params.subscribe(
      (params : Params) => {
          let bookingId = params['bookingId'];
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

}
