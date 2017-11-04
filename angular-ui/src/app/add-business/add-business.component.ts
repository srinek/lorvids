import { Component, OnInit, ViewChild } from '@angular/core';
import {ActivatedRoute, Router, Params} from '@angular/router';
import { NgForm } from '@angular/forms';

import {FacadeService} from '../service/facade.service';
import {Logger} from '../service/logger.service';
import {Business} from '../model/business.model';

@Component({
  selector: 'app-add-business',
  templateUrl: './add-business.component.html',
  styleUrls: ['./add-business.component.css']
})
export class AddBusinessComponent implements OnInit {

  @ViewChild('addBusinessForm') busForm : NgForm;
  public error : boolean = false;
  public errorMessage : string = "";

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

}
