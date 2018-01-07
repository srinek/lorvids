import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import {ActivatedRoute, Router, Params} from '@angular/router';


import {FacadeService} from '../service/facade.service';
import {Logger} from '../service/logger.service';
import {Business} from '../model/business.model';

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

  constructor(private facadeService : FacadeService,
    private route : ActivatedRoute,
    private router : Router,
    private logger: Logger) { }

  ngOnInit() {
    this.duration.setHours(0);
    this.duration.setMinutes(0);
  }

  addServices(){
     console.log("service submitted", this.serviceForm);
  }
}
