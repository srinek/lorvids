import { Component, OnInit } from '@angular/core';

import {FacadeService} from '../service/facade.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Category } from '../model/category.model';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  public categories:Array<Category> = [];
  public categoryValues : Array<string> = [];

  private selectedCategory : string;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private facadeService : FacadeService) { }

  ngOnInit() {
      this.facadeService.triggerMainPageLoaded();
      this.categories = this.facadeService.getAllCategories();
      this.categories && this.categories.forEach( (category : Category) => {
        this.categoryValues.push(category.getCategoryName());
      })

  }

  public categorySelected(value:any):void {
    console.log('Selected value is: ', value);
    this.selectedCategory = value;
  }

  onSearch(searchVal) : void{
    console.log("searchVal", searchVal);
    this.router.navigate(['/search'],{relativeTo:this.route, queryParams : {'look_for' : searchVal}});
  }

  

}
