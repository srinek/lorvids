import { Component, OnInit, ViewChild } from '@angular/core';
import {ActivatedRoute, Router, Params, ParamMap} from '@angular/router';
import { NgForm } from '@angular/forms';

import {FacadeService} from '../service/facade.service';
import {Logger} from '../service/logger.service';
import {Business} from '../model/business.model';
import { SelectComponent } from 'ng2-select';
import { BusinessHoursComponent } from '../common/business-hours/business-hours.component';
import { UploadMetadata } from 'angular2-image-upload/lib/image-upload/before-upload.interface';
import { FileHolder } from 'angular2-image-upload/lib/image-upload/image-upload.component';
import { environment } from '../../environments/environment';
import { Category } from '../model/category.model';

@Component({
  selector: 'app-add-business',
  templateUrl: './add-business.component.html',
  styleUrls: ['./add-business.component.css']
})
export class AddBusinessComponent implements OnInit {

  //@ViewChild('addBusinessForm') private busForm : NgForm;
  //@ViewChild(BusinessHoursComponent)
  //private busHoursComponent: BusinessHoursComponent;
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
  private update : boolean = false;
  private busId : string = "";
  categorySelected : Category;
  imageRoot : string = environment.imageRoot;
  businessLoaded : boolean = false;
  //public error : boolean = false;
 //public errorMessage : string = "";

  constructor(
    private facadeService : FacadeService,
    private route : ActivatedRoute,
    private router : Router,
    private logger: Logger) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params : Params) => {
         this.busId = params['busId'];
         if(this.busId) {
            this.facadeService.getBusiness(this.busId).subscribe(
              (business : Business) => {
                this.businessData = business;
                this.categorySelected = this.businessData.category;
                this.loadImages();
                this.update = true;
                this.businessLoaded = true;
                console.log("categorySelected ", this.categorySelected);
              },
              (error : string) => {
                this.error = true;
                this.errorMessage = "We didn't find the business with Id "+this.busId;
              }
            );
        }
        else{
          this.businessLoaded = true;
        }
    });

    this.route.queryParamMap.subscribe( 
      (qParamMap: ParamMap) => {
        let authCode = qParamMap.get('code');
        if(authCode){
          // get auth token and refresh token.
          
        }
    });
  }

  loadImages(){
    this.businessData.images.forEach( (eachImage) => {
      this.images.push(this.imageRoot+"/"+eachImage);
    });
    console.log("images ", this.images);
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
    this.businessData.category = this.categorySelected;
    if(this.update){
      this.updateBusiness();
    }
    else{
      this.saveBusiness();
    }
  }
  
  private updateBusiness(){
    this.facadeService.updateBusiness(this.busId, this.businessData).subscribe(
      (result : string) => {
        this.router.navigate(['/addsvc', this.busId],
          {relativeTo:this.route}
        );
      },
      (error : string) => {
        this.error = true;
        this.errorMessage = "Yikes!!! something cramped our service "+error;
      }
    );
  }

  private saveBusiness(){
    this.facadeService.saveBusiness(this.businessData).subscribe(
      (busId : string) => {
        this.router.navigate(['/addsvc', busId],
          {relativeTo:this.route}
        );
      },
      (error : string) => {
        console.error(error);
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

  getAllCategories() {
    return this.facadeService.getAllCategories();
  }
  onUploadFinished(file: FileHolder) {
    console.log(JSON.stringify(file.serverResponse));
    console.log("upload response ", file.serverResponse._body);
    let imageName : string = this.facadeService.removequotes(file.serverResponse._body);
    this.businessData.images.push(imageName);
    this.businessData.defaultImage=this.businessData.images[0];
  }

  onImageRemoved(file: FileHolder) {
     //console.log("file ", file);
     this.facadeService.deleteFile(file.src).subscribe(
       (message : string) => {
          console.log("file deleted ", message);
          let matchedIndex;
          this.businessData.images.forEach( (eachImage) => {
            let matches = file.src.match(/eachImage/);
            if(matches){
              matchedIndex = this.businessData.images.indexOf(matches[0]);
            }
          });
          this.businessData.images.splice(matchedIndex, 1);
          console.log(" images ", this.businessData.images);
       },
       (error : string) => {
          console.log("error deleting file ", error);
       }
     );
  }

  beginTimeSelected(value){
    //console.log("time selected", value);
    if(value.beginTime === "Closed"){
      this.addHoliday(value.dayInWeek);
    //  return;
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
    //console.log("time selected", value);
    if(value.endTime === "Closed"){
      this.addHoliday(value.dayInWeek);
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

    //console.log("business data", this.businessData);
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
