import { Component, OnInit } from '@angular/core';
import { FacadeService } from '../service/facade.service';
import { ActivatedRoute, Router,Params } from '@angular/router';
import { Logger } from '../service/logger.service';
import { Staff } from '../model/staff.model';
import { StaffPractice } from '../model/staff-practice.model';
import { Business } from '../model/business.model';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-staff-page',
  templateUrl: './staff-page.component.html',
  styleUrls: ['./staff-page.component.css']
})
export class StaffPageComponent implements OnInit {

  public error : boolean = false;
  public errorMessage : string = "";
  staffLoaded : boolean = false;
  staff : Staff;
  practiceSelected : StaffPractice;
  selectedBusiness : Business;

  constructor(private facadeService : FacadeService,
    private route : ActivatedRoute,
    private router : Router,
    private logger: Logger) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params : Params) => {
          let staffId = params['staffId'];
          this.facadeService.getStaffById(staffId)
          .map( 
            ( (staff : Staff) => {
              this.staff = staff;
              this.practiceSelected = this.staff.practices[0];
              this.staffLoaded = true;
              console.log("staff loaded", this.staff);
              return this.practiceSelected.bus_id;
            }) 
          ).catch((error) => {
            return Observable.throw(error);
          })
          .flatMap((bus_id)=> this.facadeService.getBusiness(bus_id, false))
          .subscribe(
              (business : Business) => {
                 this.selectedBusiness = business;
                 console.log("business loaded", this.selectedBusiness);
              },
              (error : string) => {
                this.error = true;
                this.errorMessage = "Yikes!!! something cramped our service "+error;
              }
          );
      }
    );
  }

  gotoBusiness(){
    this.router.navigate(['/bushome', this.practiceSelected.bus_id],
    {relativeTo:this.route});
  }

}
