import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {

  private searchFor : string = "searchfor";

  constructor(private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
  }

  onSearch() : void{
    this.router.navigate(['/search/'+this.searchFor],{relativeTo:this.route});
  }

}
