import { Component, OnInit } from '@angular/core';

import {FacadeService} from '../service/facade.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  public categories:Array<string> = [];

  private selectedCategory : string;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private facadeService : FacadeService) { }

  ngOnInit() {
      this.facadeService.triggerMainPageLoaded();
      this.categories.push("Doctors & Dentists");
      this.categories.push("Spa & Saloons");
      this.categories.push("CPA & Financial Services");
      this.categories.push("Lawyers & Legal Services");
      this.categories.push("Cleaners & Home Services");
      this.categories.push("Education & Schools");
  }

  public categorySelected(value:any):void {
    console.log('Selected value is: ', value);
    this.selectedCategory = value;
  }

  onSearch(searchVal) : void{
    this.router.navigate(['/search'],{relativeTo:this.route, queryParams : {'look_for' : searchVal}});
  }

}
