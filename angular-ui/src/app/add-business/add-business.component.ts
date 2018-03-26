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
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-add-business',
  templateUrl: './add-business.component.html',
  styleUrls: ['./add-business.component.css']
})
export class AddBusinessComponent implements OnInit {

  @ViewChild('addBusinessForm') private busForm : NgForm;
  @ViewChild(BusinessHoursComponent)
  private busHoursComponent: BusinessHoursComponent;
  public error : boolean = false;
  public errorMessage : string = "";
  public startTime : Date = new Date(2018, 1, 7, 0, 0);
  public endTime : Date = new Date(2018, 1, 7, 23, 45);
  businessData : Business = new Business();
  private _availableServices : Array<any> = [];
  uploadApi : string = environment.appurl+"saveBusPic";
  images = [];
  awsHeaders: { [name: string]: any } = {
    //"X-Amz-Content-Sha256": "UNSIGNED-PAYLOAD"
  };

  //public error : boolean = false;
 //public errorMessage : string = "";

  constructor(
    private facadeService : FacadeService,
    private route : ActivatedRoute,
    private router : Router,
    private logger: Logger) { }

  ngOnInit() {

  }

  addBusines(){
    /* let business : Business = new Business();
    business.bus_name = this.busForm.value.busName;
    business.address = this.busForm.value.busAddr;
    business.aptSuite = this.busForm.value.aptSuite;
    business.phone = this.busForm.value.busPhone;
    business.email = this.busForm.value.busEmail;
    business.website = this.busForm.value.busWebsite;
    business.appointment_instructions = this.busForm.value.apptInstructions;
    business.statement_notes = this.busForm.value.busStatement;
    business.awards = this.busForm.value.busAwards; */
    this.facadeService.saveBusiness(this.businessData).subscribe(
      (busId : string) => {
        this.logger.log(busId);
        this.router.navigate(['/addsvc', busId],
          {relativeTo:this.route}
        );
        /* this.router.navigate(
          ['/addstaff', busId],
          {relativeTo:this.route}
        ); */
      },
      (error : string) => {
        this.error = true;
        this.errorMessage = "Yikes!!! something cramped our service "+error;
      }
    ); 
  }
  onClickBusCheckbox(){
    console.log("busHoursComponent ", this.busHoursComponent);
    this.busHoursComponent.toggleDisabled();
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

  onUploadFinished(file: FileHolder) {
    //console.log(JSON.stringify(file.serverResponse));
    console.log("upload response ", file.serverResponse._body);
    this.businessData.images.push(file.serverResponse._body);
    this.businessData.defaultImage=this.businessData.images[0];
  }
  
  onImageRemoved(file: FileHolder) {
     console.log("file ", file);
     this.facadeService.deleteFile(file.src).subscribe(
       (message : string) => {
          console.log("file deleted ", message);
       },
       (error : string) => {
          console.log("error deleting file ", error);
       }
     );
  }

  beginTimeSelected(value){
    console.log("time selected", value);
    if(value.beginTime === "Closed"){
      this.addHoliday(value.dayInWeek);
      return;
    }
    let busHour = this.businessData.bus_hours.find( (busHr)=> {
      return busHr.day === value.dayInWeek;
    });
    if(!busHour){
      this.businessData.bus_hours.push({day:value.dayInWeek, startTime : value.beginTime});
    }
    else{
      busHour.startTime = value.beginTime;
    }
  }
  
  endTimeSelected(value){
    console.log("time selected", value);
    if(value.endTime === "Closed"){
      this.addHoliday(value.dayInWeek);
      return;
    }
    let busHour = this.businessData.bus_hours.find( (busHr)=> {
      return busHr.day === value.dayInWeek;
    });
    if(!busHour){
      this.businessData.bus_hours.push({day:value.dayInWeek, endTime : value.endTime});
    }
    else{
      busHour.endTime = value.endTime;
    }

    console.log("business data", this.businessData);
  }

  addHoliday(dayInWeek){
    let dayExist = this.businessData.holidays.weekdays.find( (holiday) => {
      return holiday === dayInWeek;
    });
    if(!dayExist){
      this.businessData.holidays.weekdays.push(dayInWeek);
    }
  }

}
