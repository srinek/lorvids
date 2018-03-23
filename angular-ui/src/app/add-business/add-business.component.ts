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
  private _availableServices : Array<any> = [];
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
    let business : Business = new Business();
    business.bus_id = this.busForm.value.busid;
    business.bus_name = this.busForm.value.busName;
    business.address = this.busForm.value.busAddr;
    business.email = this.busForm.value.busEmail;
    business.phone = this.busForm.value.busPhone;
    business.website = this.busForm.value.busWs;
    this.router.navigate(
      ['/addsvc', 1],
      {relativeTo:this.route}
    );
     this.facadeService.saveBusiness(business).subscribe(
      (busId : string) => {
        this.logger.log(busId);
        this.router.navigate(
          ['/addstaff', busId],
          {relativeTo:this.route}
        );
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
