import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import {ActivatedRoute, Router, Params} from '@angular/router';


import {FacadeService} from '../service/facade.service';
import {Logger} from '../service/logger.service';
import {Business} from '../model/business.model';
import { Service } from '../model/service.model';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.css']
})
export class AddServiceComponent implements OnInit {

  duration: Date = new Date();
  @ViewChild('addServiceForm') serviceForm : NgForm;
  public error : boolean = false;
  public errorMessage : string = "";
  serviceData : Service = new Service();
  businessData : Business;
  services : Array<Service> = [];
  busId : string = "";
  isAddService : boolean = true;

  constructor(private facadeService : FacadeService,
    private route : ActivatedRoute,
    private router : Router,
    private logger: Logger) { }

  ngOnInit() {
    this.duration.setHours(0);
    this.duration.setMinutes(0);
    this.route.params.subscribe(
      (params : Params) => {
         this.busId = params['busId'];
         if(this.busId) {
            this.facadeService.getBusiness(this.busId, false).subscribe(
              (business : Business) => {
                this.businessData = business;
                this.services = business.services;
              },
              (error : string) => {
                this.error = true;
                this.errorMessage = "We didn't find the business with Id "+this.busId;
              }
            );
        }
    });
  }

  addServices(){
     //console.log("service submitted", this.serviceForm);
    this.businessData.services = this.services;
    this.facadeService.updateBusiness(this.busId, this.businessData).subscribe(
      (result : string) => {
        this.router.navigate(['/addstaff', this.busId],
          {relativeTo:this.route}
        );
      },
      (error : string) => {
        this.error = true;
        this.errorMessage = "Yikes!!! something cramped our service "+error;
      }
    );
  }

  addService() {
    let updated = false;
    const newSvcObj = Object.assign({}, this.serviceData);
    for(let i =0; i < this.services.length; i++){
      let lsvc = this.services[i];
      if(lsvc.name === this.serviceData.name){
        
        this.services[i] = newSvcObj;
        updated = true;
        break;
      }
    }
    if(!updated){
      this.services.push(newSvcObj);
    }
    this.resetServiceData();
    console.log("services ", this.services);
  }

  resetServiceData(){
    /* this.serviceData.name = "";
    this.serviceData.cost = "";
    this.serviceData.description = "";
    this.serviceData.duration = ""; */
    this.serviceForm.reset();
    this.isAddService = true;
  }

  modifyService(service){
    this.serviceData = service;
    this.isAddService = false;
  }
}
