import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-list-business',
  templateUrl: './list-business.component.html',
  styleUrls: ['./list-business.component.css']
})
export class ListBusinessComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    
  }

  createbtnClick= function () {
    this.router.navigate(['addb']);
  };

}
