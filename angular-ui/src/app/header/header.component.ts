import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppointmentService} from '../service/appointment.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isMainPage : boolean = true;

  private mainPageUnloadedSubscription : Subscription;

  constructor(private appointmentService : AppointmentService) {

   }

  ngOnInit() {
      this.mainPageUnloadedSubscription = this.appointmentService.mainPageUnLoaded.subscribe(
         (mainPageUnloaded : boolean) => {
           this.isMainPage = !mainPageUnloaded;
         }
       );
  }

  ngOnDestroy(){
    this.mainPageUnloadedSubscription.unsubscribe();
  }

  

}
