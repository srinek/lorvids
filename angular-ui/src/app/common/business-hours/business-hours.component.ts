import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-business-hours',
  templateUrl: './business-hours.component.html',
  styleUrls: ['./business-hours.component.css']
})
export class BusinessHoursComponent implements OnInit {

  @Input() startTime : Date;
  @Input() endTime : Date;
  public beginItems:Array<string> = [];
  public endItems:Array<string> = [];
  public weekdays : Array<string> = ["Sun", "Mon", "Tue", "Wed","Thu", "Fri", "Sat"];
  private disabled : boolean = false;

  constructor() { }

  ngOnInit() {
    let newTime = this.startTime;
    this.beginItems.push(newTime.toLocaleString('en-US', {hour:"2-digit", minute:"2-digit"}));
    this.endItems.unshift(newTime.toLocaleString('en-US', {hour:"2-digit", minute:"2-digit"}));
    while(newTime.getTime() < this.endTime.getTime()){
      newTime.setMinutes(newTime.getMinutes() + 15);
      this.beginItems.push(newTime.toLocaleString('en-US', {hour:"2-digit", minute:"2-digit"}));
      this.endItems.unshift(newTime.toLocaleString('en-US', {hour:"2-digit", minute:"2-digit"}));
    }
  }

  toggleDisabled(){
    this.disabled = !this.disabled;
    console.log("diabled called ", this.disabled);
  }



}
