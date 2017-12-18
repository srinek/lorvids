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
          this.facadeService.getBusiness(businessId)
          .subscribe(
              (business : Business) => {
                  this.business = business;
                  var staff1 = new Staff({
                    "bus_hours": [
                      {
                        "day": "ALL",
                        "time": "10AM - 5PM"
                      },
                      {
                        "day": "MON",
                        "time": "12AM - 5PM"
                      }
                    ],
                    "bus_id": "b-test-01",
                    "service_time": "30m",
                    "staff_id": "b-test-01-s-05",
                    "staff_name": "Dr. Kartheek",
                    "tags": "DDS from NYU, 20 years experience"
                  });
                  var staff2 = new Staff({
                    "bus_hours": [
                      {
                        "day": "ALL",
                        "time": "10AM - 5PM"
                      },
                      {
                        "day": "MON",
                        "time": "12AM - 5PM"
                      }
                    ],
                    "bus_id": "b-test-01",
                    "service_time": "30m",
                    "staff_id": "b-test-01-s-04",
                    "staff_name": "Dr. Nan",
                    "tags": "DDS from NYU, 20 years experience"
                  });
                  var staff3 = new Staff({
                    "bus_hours": [
                      {
                        "day": "ALL",
                        "time": "10AM - 5PM"
                      },
                      {
                        "day": "MON",
                        "time": "12AM - 5PM"
                      }
                    ],
                    "bus_id": "b-test-01",
                    "service_time": "30m",
                    "staff_id": "b-test-01-s-03",
                    "staff_name": "Dr. Sam",
                    "tags": "DDS from NYU, 20 years experience"
                  });
                  this.business.staff.push(staff1);
                  this.business.staff.push(staff2);
                  this.business.staff.push(staff3);
                  this.businessLoaded = true;
                  this.staffSelected = staff3;
              },
              (error : string) => {
                this.error = true;
                this.errorMessage = "Yikes!!! something cramped our service "+error;
              }
          )
      }
    );
  }

}
