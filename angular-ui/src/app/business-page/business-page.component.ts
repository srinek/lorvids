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
                        "day": -1,
                        "endTime": "17:00",
                        "startTime": "10:00"
                      },
                      {
                        "day": 1,
                        "endTime": "17:00",
                        "startTime": "12:00"
                      }
                    ],
                    "bus_id": "b-test-01",
                    "imageUrl": [
                      "profile.jpg"
                    ],
                    "service_time": "30",
                    "staff_id": "b-test-01-s-01",
                    "staff_name": "Dr. Devi",
                    "tags": "DDS from RSDM, fellow in oro facial pain"
                  });
                  var staff2 = new Staff({
                    "bus_id": "b-test-01",
                    "imageUrl": [
                      "profile.jpg"
                    ],
                    "service_time": "30",
                    "staff_id": "b-test-01-s-03",
                    "staff_name": "Dr. Sara",
                    "tags": "hair cut, hair wash, nails"
                  });
                  var staff3 = new Staff({
                    "bus_id": "b-test-01",
                    "holidays": [
                      "SAT"
                    ],
                    "imageUrl": [
                      "profile.jpg"
                    ],
                    "service_time": "30",
                    "staff_id": "b-test-01-s-02",
                    "staff_name": "Dr. Susan",
                    "tags": "DDS from NYU"
                  });
                  this.business.staff.push(staff1);
                  this.business.staff.push(staff2);
                  this.business.staff.push(staff3);
                  this.staffSelected = staff1;
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
