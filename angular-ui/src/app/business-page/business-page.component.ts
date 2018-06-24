import { Component, OnInit } from '@angular/core';
import { FacadeService } from '../service/facade.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Logger } from '../service/logger.service';
import { Business } from '../model/business.model';
import { Staff } from '../model/staff.model';
import { AppointmentSlot } from '../model/appointment-slot.model';
import { ParamMap } from '@angular/router/src/shared';
import { environment } from '../../environments/environment';
import { Service } from '../model/service.model';

@Component({
  selector: 'app-business-page',
  templateUrl: './business-page.component.html',
  styleUrls: ['./business-page.component.css']
})
export class BusinessPageComponent implements OnInit {

  public error : boolean = false;
  public errorMessage : string = "";
  

  business : Business;
  prevAppointment : AppointmentSlot;
  businessLoaded : boolean;
  staffSelected : Staff;
  srvcSelected : Service;
  imageRoot : string = environment.imageRoot;

  constructor(private facadeService : FacadeService,
    private route : ActivatedRoute,
    private router : Router,
    private logger: Logger) { }

  ngOnInit() {

    this.route.params.subscribe(
      (params : Params) => {
          let businessId = params['busId'];
          this.facadeService.getBusiness(businessId)
          .subscribe(
              (business : Business) => {
                  this.business = business;
                  this.staffSelected = business.defaultStaff;
                  this.srvcSelected = business.services[0];
                  this.loadPreviousAppointment();
                  this.businessLoaded = true;
                  console.log("this.staffSelected ", this.staffSelected);
              },
              (error : string) => {
                console.error(error);
                this.error = true;
                this.errorMessage = "Yikes!!! something cramped our service "+error;
                throw error;
              }
          );
      }
    );
  }

  private loadPreviousAppointment(){
    // load previous appointment details for modify appointment
    this.route.queryParamMap.subscribe(
      (paramMap: ParamMap) => {
        let prevSlotId = paramMap.get('psId');
        if(prevSlotId){  //load the staff that was with previous appointment
          this.facadeService.getAppointment(prevSlotId)
            .subscribe(
                (prevSlot : AppointmentSlot) => {
                    this.prevAppointment = prevSlot;
                    this.staffSelected = this.business.findStaff(prevSlot.staffId);
                },
                (error : string) => {
                  this.error = true;
                  this.errorMessage = "Yikes!!! something cramped our service "+error;
                  throw error;
                }
          );
        }
        else{  //load first one in order
            this.staffSelected = this.business.staff[0];
        }
      }
    );
  }


  
  
}
