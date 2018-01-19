import { Component, OnInit } from '@angular/core';
import { EventService } from '../shared/event.service';
import { EventInfo } from '../shared/EventInfo';

@Component({
  selector: 'app-admin-detail',
  templateUrl: './admin-detail.component.html',
  styleUrls: ['./admin-detail.component.css']
})
export class AdminDetailComponent implements OnInit {
  
  public eventInfo: EventInfo;

  constructor(private eventService:EventService) { 
    
    this.eventService.eventUpdated.subscribe(
        (eventInfo:EventInfo) => {console.log("got event Info", eventInfo);  this.updateDetail(eventInfo);}
    );

  }

  ngOnInit() {
  }

  updateDetail(eventInfo : EventInfo) {
    this.eventInfo = eventInfo;
  }

}
