import { Component, OnInit, Input } from '@angular/core';
import {ActivatedRoute, Router, Params} from '@angular/router';
import { FacadeService} from '../service/facade.service';
import {Business} from '../model/business.model';
import {Staff} from '../model/staff.model';
import { User } from '../model/user.model';
import { Appointment } from '../model/appointment.model';

@Component({
  selector: 'app-confirm-appointment',
  templateUrl: './confirm-booking.component.html',
  styleUrls: ['./confirm-booking.component.css']
})
export class ConfirmBookingComponent implements OnInit {

  @Input() business : Business;
  @Input() staff : Staff;
  @Input() user : User;
  @Input() appointment : Appointment;
  bookingId : string;
  public error : boolean = false;
  public errorMessage : string = "";
  
  constructor(
    private facadeService : FacadeService,
    private route : ActivatedRoute,
    private router : Router
  ) { }

  ngOnInit() {
    /* this.route.params.subscribe(
      (params : Params) => {
          this.bookingId = params['bookingId'];
          let staffId = params['staffId'];
          let businessId = params['busId'];
          this.facadeService.getBusiness(businessId, false)
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
          this.facadeService.getStaff(businessId, staffId)
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
      }
    ); */

  }

}
