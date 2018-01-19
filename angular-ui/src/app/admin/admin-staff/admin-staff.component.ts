import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-staff',
  templateUrl: './admin-staff.component.html',
  styleUrls: ['./admin-staff.component.css']
})
export class AdminStaffComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  addNewStaff() {
    this.router.navigateByUrl('/staff-details/0');
  }

}
