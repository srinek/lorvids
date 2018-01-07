import { Component, OnInit, ViewChild } from '@angular/core';
import {ActivatedRoute, Router, Params} from '@angular/router';
import { NgForm } from '@angular/forms';

import {FacadeService} from '../service/facade.service';
import {Logger} from '../service/logger.service';
import {Business} from '../model/business.model';
import { SelectComponent } from 'ng2-select';

@Component({
  selector: 'app-add-staff',
  templateUrl: './add-staff.component.html',
  styleUrls: ['./add-staff.component.css']
})
export class AddStaffComponent implements OnInit {

  @ViewChild('addStaffForm') staffForm : NgForm;
  public error : boolean = false;
  public errorMessage : string = "";
  public startTime : Date = new Date(2018, 1, 7, 0, 0);
  public endTime : Date = new Date(2018, 1, 7, 23, 45);
  
  constructor(
    private facadeService : FacadeService,
    private route : ActivatedRoute,
    private router : Router,
    private logger: Logger) { 

  }

  ngOnInit() {
  
  }

  addStaff(){
    console.log("staff added ", this.staffForm);
  }



}
