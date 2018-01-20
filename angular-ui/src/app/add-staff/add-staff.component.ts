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
  private _availableServices : Array<any> = [];
  images = [];
  awsHeaders: { [name: string]: any } = {
    //"X-Amz-Content-Sha256": "UNSIGNED-PAYLOAD"
  };

  constructor(
    private facadeService : FacadeService,
    private route : ActivatedRoute,
    private router : Router,
    private logger: Logger) { 

  }

  ngOnInit() {
      this._availableServices.push({name:"Dental Cleaning", duration : "30m" });
      this._availableServices.push({name:"Root Canal Treatment", duration : "30m" });
      this._availableServices.push({name:"Cavity", duration : "1h" });
      this._availableServices.push({name:"Amalgams", duration : "30m" });
      setTimeout(()=>{
        this.images = [
          "https://s3.amazonaws.com/lorvid-devlot/b-test-01-1516414466408.jpg",
          "https://s3.amazonaws.com/lorvid-devlot/b-test-01-1516414710535.jpg",
        ];
      }, 1000);
  }

  public get availableServices(){
    return this._availableServices;
  }

  addStaff(){
    console.log("staff added ", this.staffForm);
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
