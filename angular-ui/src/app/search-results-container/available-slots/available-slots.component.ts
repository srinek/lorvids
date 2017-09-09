import { Component, OnInit, Input } from '@angular/core';

import {Staff} from '../../model/Staff';

@Component({
  selector: 'app-available-slots',
  templateUrl: './available-slots.component.html',
  styleUrls: ['./available-slots.component.css']
})
export class AvailableSlotsComponent implements OnInit {

  @Input() staff : Staff;

  constructor() { }

  ngOnInit() {
  }

}
