import { Component, OnInit } from '@angular/core';
import { EventService } from '../shared/event.service';
import { EventInfo } from '../shared/EventInfo';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
  providers:[EventService]
})
export class AdminDashboardComponent implements OnInit {

  // public eventInfo: EventInfo;
  
  //   constructor(private eventService:EventService) { 
      
  //     // this.eventService.eventUpdated.subscribe(
  //     //     (eventInfo:EventInfo) => {this.eventInfo = eventInfo; }
  //     // );
  //   }

  public eventClicked : boolean = false;

  constructor() {

  }

  onEventClicked(event) {
    console.log("event clicked:");
    this.eventClicked = true;
  }

  ngOnInit() { }

}
