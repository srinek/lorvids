import { Component, OnInit, ViewChild } from '@angular/core';
import {ActivatedRoute, Router, Params} from '@angular/router';
import { NgForm } from '@angular/forms';

import {FacadeService} from '../service/facade.service';
import {Logger} from '../service/logger.service';
import {Business} from '../model/business.model';
import { SelectComponent } from 'ng2-select';
import { BusinessHoursComponent } from '../common/business-hours/business-hours.component';
import { UploadMetadata } from 'angular2-image-upload/lib/image-upload/before-upload.interface';
import { FileHolder } from 'angular2-image-upload/lib/image-upload/image-upload.component';
import { Staff } from '../model/staff.model';
import { Service } from '../model/service.model';
import { environment } from '../../environments/environment';

import { Location } from '@angular/common';
@Component({
  selector: 'app-add-staff',
  templateUrl: './add-staff.component.html',
  styleUrls: ['./add-staff.component.css']
})
export class AddStaffComponent implements OnInit {

  @ViewChild('addStaffForm') private staffForm : NgForm;
  @ViewChild(BusinessHoursComponent)
  private busHoursComponent: BusinessHoursComponent;
  public error : boolean = false;
  public errorMessage : string = "";
  public startTime : Date = new Date(2018, 1, 7, 0, 0);
  public endTime : Date = new Date(2018, 1, 7, 23, 45);
  awsHeaders: { [name: string]: any } = {/*"X-Amz-Content-Sha256": "UNSIGNED-PAYLOAD"*/};
  imageRoot : string = environment.imageRoot;
  businessData : Business;
  staffData : Staff = new Staff();
  staffList : Array<Staff> = [];
  private _availableServices : Array<Service> = [];
  busId : string = "";
  uploadApi : string = "";
  staffUploadedImages : Array<string> = [];
  isAddStaff : boolean = true;
  sameAsBusiness : boolean = false;
  
  constructor(
    private facadeService : FacadeService,
    private route : ActivatedRoute,
    private router : Router,
    private logger: Logger,
    private location: Location) { 

  }

  ngOnInit() {
    this.route.params.subscribe(
      (params : Params) => {
         this.busId = params['busId'];
         if(this.busId) {
            this.facadeService.getBusiness(this.busId, true).subscribe(
              (business : Business) => {
                this.businessData = business;
                this._availableServices = business.services;
                this.staffList = business.staff;
                this.uploadApi = environment.appurl+"savepic/"+this.busId;
              },
              (error : string) => {
                this.error = true;
                this.errorMessage = "We didn't find the business with Id "+this.busId;
              }
            );
        }
    });
  }

  public get availableServices(){
    return this._availableServices;
  }

  addStaff(){
    console.log("staff added ", this.staffForm);      
    let updated = false;
    let newStaffObj = Object.assign({}, this.staffData);
    if(this.sameAsBusiness){
      newStaffObj.bus_hours = [];
    }
    for(let i =0; i < this.staffList.length; i++){
      let lsatff = this.staffList[i];
      if(lsatff.staff_id === this.staffData.staff_id){
        this.staffList[i] = newStaffObj;
        updated = true;
        break;
      }
    }
    if(!updated){
      this.staffList.push(newStaffObj);
    }
    this.resetStaffData();
    console.log("Staff List ", this.staffList);
  }
   
  onClickBusCheckbox(){
    //console.log("busHoursComponent ", this.busHoursComponent);
    this.busHoursComponent.toggleDisabled();
    if(this.sameAsBusiness){
      this.staffData.bus_hours = this.businessData.bus_hours;
    }
    else{
      this.staffData.bus_hours = [];
    }
  }

  saveStaff(){
    this.businessData.staff = this.staffList;
    this.facadeService.saveStaff(this.businessData).subscribe(
      (result : string) => {
        this.router.navigate(['/admin/dashboard', this.busId],
          {relativeTo:this.route}
        );
        console.log(" success ", result);
      },
      (error : string) => {
        this.error = true;
        this.errorMessage = "Yikes!!! something cramped our service "+error;
      }
    );
  }

  onBeforeUpload(metadata: UploadMetadata) : Promise<UploadMetadata> {
    console.log(" before UploadMetadata" , metadata);
    const reader = new FileReader();
    reader.readAsDataURL(metadata.file);
    let fileRead = false;
    return new Promise((resolve, reject) => {
      reader.onload = function(){
        const base64 = reader.result.split(',')[1]; 
        metadata.formData = {"base64": base64};
        console.log(" after UploadMetadata" , metadata);
        resolve(metadata);
      }
    });
  }

  onImageRemoved(file: FileHolder) {
     //console.log("file ", file);
     this.facadeService.deleteFile(file.src).subscribe(
       (message : string) => {
          console.log("file deleted ", message);
       },
       (error : string) => {
          console.log("error deleting file ", error);
       }
     );
  }
  showStaffAffliations(){
    if(this.businessData){
      return this.businessData.category.showStaffAffliations();
    }
    return false;
  }

  modifyStaff(editStaff){
    this.staffData = editStaff;
    this.isAddStaff= false;
    this.staffData.images.forEach( (eachImage) => {
      this.staffUploadedImages.push(this.imageRoot +"/"+ eachImage);
    });
    console.log("staffUploadedImages", this.staffUploadedImages);
  }

  removeStaff(removeStaff){

  }
  
  resetStaffData(){
    /* this.serviceData.name = "";
    this.serviceData.cost = "";
    this.serviceData.description = "";
    this.serviceData.duration = ""; */
    this.staffForm.reset();
    this.isAddStaff = true;
  }


  beginTimeSelected(value){
    //console.log("time selected", value);
    if(value.beginTime === "Closed"){
      this.addHoliday(value.dayInWeek);
      return;
    }
    let busHour = this.staffData.bus_hours.find( (busHr)=> {
      return busHr.day === value.dayInWeek;
    });
    if(!busHour){
      this.staffData.bus_hours.push({day:value.dayInWeek, startTime : value.beginTime});
    }
    else{
      busHour.startTime = value.beginTime;
    }
  }
  
  endTimeSelected(value){
    //console.log("time selected", value);
    if(value.endTime === "Closed"){
      this.addHoliday(value.dayInWeek);
      return;
    }
    let busHour = this.staffData.bus_hours.find( (busHr)=> {
      return busHr.day === value.dayInWeek;
    });
    if(!busHour){
      this.staffData.bus_hours.push({day:value.dayInWeek, endTime : value.endTime});
    }
    else{
      busHour.endTime = value.endTime;
    }

    //console.log("business data", this.businessData);
  }

  addHoliday(dayInWeek){
    let dayExist = this.staffData.holidays.weekdays.find( (holiday) => {
      return holiday === dayInWeek;
    });
    if(!dayExist){
      this.staffData.holidays.weekdays.push(dayInWeek);
    }
  }

  
  back(){
    this.location.back();
  }
  
}
