import { Injectable }    from '@angular/core';
import { Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

import {Business} from '../model/business.model';
import {Staff} from '../model/staff.model';
import {Slots} from '../model/slots.model';
import {AppointmentSlot} from '../model/appointment-slot.model';
import {Logger} from './logger.service';
import {SearchService} from './search.service';

//test imports
import {trendingBusiness,recentlyVisitedBusiness} from '../test-data/test-data';

@Injectable()
export class AppointmentService {

    mainPageUnLoaded = new Subject<boolean>();
    searchResults : Business[];
    

    constructor(private logger: Logger,
                private searchService : SearchService){

    }

    private rating : number[] = [0 , 0 , 0 ,0 ];

    public getTrendingBusiness() : Business[] {
        return trendingBusiness;
    }

    public getRecentlyVisitedBusiness() : Business[] {
        return recentlyVisitedBusiness;
    }

    public getSearchResults(searchTerm : string) : Observable<Business[]> {
        this.mainPageUnLoaded.next(true);
        return this.searchService.invokeSearch(searchTerm);
    }

    public getAppointmentSlots(business : Business, staff : Staff) : Observable<Slots> {
        var slots = new Slots();
        var nextdate = business.getNextBusinessDayDefault();
        slots.date = nextdate
        slots.slots = business.getAvailableSlots(staff, nextdate);
        this.logger.log(JSON.stringify(slots));
        return null;
    }

    public getAvailableSlots(business : Business, staff : Staff) : AppointmentSlot[] {
        var slots = [];
        var date = new Date();
        var hours = date.getHours();
        for(var i = 0; i < 6; i++){
            var appointmentSlot = new AppointmentSlot();
            var time = hours +":"+ ( i * parseInt(staff.service_time.substring(0,2)));
            appointmentSlot.slotTime = time;
            slots[slots.length] = appointmentSlot;
        }
        return slots;
    }
    
    public triggerMainPageLoaded(){
        this.mainPageUnLoaded.next(false);
    }
}