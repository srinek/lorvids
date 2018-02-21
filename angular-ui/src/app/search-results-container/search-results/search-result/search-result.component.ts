import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { FacadeService} from '../../../service/facade.service';
import { Business } from '../../../model/business.model';
import { Staff } from '../../../model/staff.model';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  @Input() business : Business;
  staffNames : Array<any> = [] ;
  selectedStaff : Staff;
  selectedDate : Date;
  imageRoot : string = environment.imageRoot;

  constructor(private facadeService : FacadeService,
    private route : ActivatedRoute,
    private router : Router
    ) { }

  ngOnInit() {
    this.selectedStaff = this.business.staff[0];
    this.selectedDate =  new Date();
    this.business.staff.forEach( (staff : Staff) => {
        this.staffNames.push({"id":staff.staff_id, "text":staff.staff_name});
      }
    )
  }

  public selected(value:any):void {
    this.selectedStaff = this.business.staff.find( (elem) => {
       return elem.staff_id === value.id;
    });
  }

  public gotoBusiness(business : Business){
    this.router.navigate(['/bushome', business.bus_id],
    {relativeTo:this.route});
  }
}
