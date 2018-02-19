import { Component, OnInit, OnDestroy } from '@angular/core';
import { FacadeService} from '../service/facade.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isMainPage : boolean = true;
  showNav : boolean = false;

  private mainPageUnloadedSubscription : Subscription;

  constructor(private facadeService : FacadeService) {

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

}
