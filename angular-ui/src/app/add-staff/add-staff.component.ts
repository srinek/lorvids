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
  
  constructor(
    private facadeService : FacadeService,
    private route : ActivatedRoute,
    private router : Router,
    private logger: Logger) { 

  }

  ngOnInit() {
    this.route.params.subscribe(
      (params : Params) => {
         this.busId = params['busId'];
         if(this.busId) {
            this.facadeService.getBusiness(this.busId, false).subscribe(
              (business : Business) => {
                this.businessData = business;
                this._availableServices = business.services;
                this.staffList = business.staff;
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
  }
   
  onClickBusCheckbox(){
    //console.log("busHoursComponent ", this.busHoursComponent);
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
}
