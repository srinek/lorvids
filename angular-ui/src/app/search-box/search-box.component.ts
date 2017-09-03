import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {


  constructor(private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
  }

  onSearch(searchVal) : void{
    this.router.navigate(['/search/', searchVal],{relativeTo:this.route});
  }

}
