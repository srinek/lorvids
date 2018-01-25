import { Component, OnInit } from '@angular/core';
import { FacadeService } from '../service/facade.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Logger } from '../service/logger.service';
import { Business } from '../model/business.model';
import { Staff } from '../model/staff.model';

@Component({
  selector: 'app-business-page',
  templateUrl: './business-page.component.html',
  styleUrls: ['./business-page.component.css']
})
export class BusinessPageComponent implements OnInit {

  public error : boolean = false;
  public errorMessage : string = "";
  business : Business;
  businessLoaded : boolean;
  staffSelected : Staff;
  

  constructor(private facadeService : FacadeService,
    private route : ActivatedRoute,
    private router : Router,
    private logger: Logger) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params : Params) => {
          let businessId = params['busId'];
          this.facadeService.getBusiness(businessId, true)
          .subscribe(
              (business : Business) => {
                  this.business = business;
                  this.staffSelected = this.business.staff[0];
                  this.businessLoaded = true;
              },
              (error : string) => {
                this.error = true;
                this.errorMessage = "Yikes!!! something cramped our service "+error;
                throw error;
              }
          )
      }
    );
  }

}
