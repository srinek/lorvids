import { Injectable }    from '@angular/core';
import { Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

// model
import {Business} from '../model/business.model';
import {Staff} from '../model/staff.model';
import {Slots} from '../model/slots.model';
import {AppointmentSlot} from '../model/appointment-slot.model';
import { Expense } from '../model/expense.model';
import { Appointment } from '../model/appointment.model';

//service
import {Logger} from './logger.service';
import {SearchService} from './search.service';
import {BusinessService} from './business.service';
import {StaffService} from './staff.service';
import {ApptService} from './appt.service';

//test imports
import {trendingBusiness,recentlyVisitedBusiness} from '../test-data/test-data';
import { SearchVO } from '../model/search-vo';
import { S3ImageService } from './s3image.service';

@Injectable()
export class FacadeService {

    mainPageUnLoaded = new Subject<boolean>();
    searchResults : Business[];
    businessSubject = new Subject<Business>();

    constructor(private logger: Logger,
                private searchService : SearchService,
                private businessService : BusinessService,
                private staffService : StaffService,
                private apptService : ApptService,
                private s3ImageService : S3ImageService
               ){

    }

    private rating : number[] = [0 , 0 , 0 ,0 ];


    /**
     *  BUSINESS APIS
     */
    public getBusiness(busId : string, loadStaff : boolean) : Observable<Business> {
        return this.businessService.getBusiness(busId, loadStaff);
    }
    

    public saveBusiness(business : Business) : Observable<string> {
        return this.businessService.saveBusiness(business);
    }

    public getBusinessExpenses(busId : string, month : string, year: string, isyearly : boolean) : Observable<Expense[]> {
        return this.businessService.getBusinessExpenses(busId, month, year, isyearly);
    }

    /**
     *  STAFF APIS
     */
    public getStaff(busId : string, staffId : string) : Observable<Staff> {
        return this.staffService.getStaff(busId, staffId);
    }

    public getStaffById(staffId : string) : Observable<Staff> {
        let staff = this.staffService.getStaffById(staffId);
        return staff;
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

    public getAppointmentSlots(business : Business, staff : Staff, 
        selectedDate : Date) : Observable<AppointmentSlot[]> {
        return this.apptService.findAvailableSlots(business.bus_id, staff.staff_id, selectedDate);
    }

    public deleteFile(fileName : string) : Observable<String> {
        return this.s3ImageService.deleteFile(fileName);
    }

    public triggerMainPageLoaded(){
        this.mainPageUnLoaded.next(false);
    }

    public triggerBusinessSubject(business : Business){
        this.businessSubject.next(business);
    }

    /***
     * APPOINTMENT API
     */

    public getBusinessBookedAppointments(busId : string, month : string, year: string, isyearly : boolean) : Observable<Appointment[]> {
        return this.apptService.getBusinessBookedAppointments(busId, month, year, isyearly);
    }

}