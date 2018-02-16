import { Component, OnInit, Input } from '@angular/core';
import { Business } from '../../../model/business.model';
import { Staff } from '../../../model/staff.model';

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

  constructor() { }

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
}
