import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { FacadeService} from '../service/facade.service';
import { Subscription } from 'rxjs/Subscription';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isMainPage : boolean = true;
  showNav : boolean = false;
  imageRoot : string = environment.imageRoot;

  private mainPageUnloadedSubscription : Subscription;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private facadeService : FacadeService) {

   }

  ngOnInit() {
      this.mainPageUnloadedSubscription = this.facadeService.mainPageUnLoaded.subscribe(
         (mainPageUnloaded : boolean) => {
           this.isMainPage = !mainPageUnloaded;
         }
       );
  }

  ngOnDestroy(){
    console.log("header component destroyed");
    this.mainPageUnloadedSubscription.unsubscribe();
  }

  toggleNav(){
    this.showNav = !this.showNav;
  }

  onSearch(searchVal) : void{
    this.router.navigate(['/search'],{relativeTo:this.route, queryParams : {'look_for' : searchVal}});
  }
}
