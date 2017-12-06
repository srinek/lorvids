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
import {BusinessService} from './business.service';
import {StaffService} from './staff.service';
import {ApptService} from './appt.service';

//test imports
import {trendingBusiness,recentlyVisitedBusiness} from '../test-data/test-data';
import { SearchVO } from '../model/search-vo';

@Injectable()
export class FacadeService {

    mainPageUnLoaded = new Subject<boolean>();
    searchResults : Business[];
    businessSubject = new Subject<Business>();

    constructor(private logger: Logger,
                private searchService : SearchService,
                private businessService : BusinessService,
                private staffService : StaffService,
                private apptService : ApptService
               ){

    }

    private rating : number[] = [0 , 0 , 0 ,0 ];

    public getBusiness(busId : string) : Observable<Business> {
        return this.businessService.getBusiness(busId);
    }

    public saveBusiness(business : Business) : Observable<string> {
        return this.businessService.saveBusiness(business);
    }

    public getStaff(busId : string, staffId : string) : Observable<Staff> {
        return this.staffService.getStaff(busId, staffId);
    }

    public saveAppointment(appt : any) : Observable<string>{
        return this.apptService.saveAppointment(appt);
    }

    public getTrendingBusiness() : Business[] {
        return trendingBusiness;
    }

    public getRecentlyVisitedBusiness() : Business[] {
        return recentlyVisitedBusiness;
    }

    public getSearchResults(searchTerm : string) : Observable<SearchVO> {
        this.mainPageUnLoaded.next(true);
        return this.searchService.invokeSearch(searchTerm);
    }

    public getFacetedSearchResults(searchTerm : string, facetMap : Map<string, string[]>) : Observable<SearchVO> {
        if(facetMap && facetMap.size > 0){
            return this.searchService.facetFilter(searchTerm, facetMap);
        }
        return this.getSearchResults(searchTerm);
    }

    public getAppointmentSlots(business : Business, staff : Staff) : Slots {
        var slots = new Slots();
        var nextdate = business.getNextBusinessDayDefault();
        slots.date = nextdate
        slots.slots = business.getAvailableSlots(staff, nextdate);
        //this.logger.log(JSON.stringify(slots));
        return slots;
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

    public triggerBusinessSubject(business : Business){
        this.businessSubject.next(business);
    }
}