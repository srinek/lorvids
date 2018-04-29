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
import { User } from '../model/user.model';
import { UserService } from './user.service';
import { Category } from '../model/category.model';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class FacadeService {

    mainPageUnLoaded = new Subject<boolean>();
    searchResults : Business[];
    businessSubject = new Subject<Business>();

    constructor(private logger: Logger,
                private searchService : SearchService,
                private businessService: BusinessService,
                private staffService : StaffService,
                private apptService : ApptService,
                private s3ImageService : S3ImageService,
                private userService : UserService,
                private authenticationService : AuthenticationService
               ){

    }

    private rating : number[] = [0 , 0 , 0 ,0 ];


    /**
     *  BUSINESS APIS
     */
    public getBusiness(busId : string) : Observable<Business> {
        return this.businessService.getBusiness(busId);
    }
    

    public saveBusiness(business : Business) : Observable<string> {
        return this.businessService.saveBusiness(business);
    }

    public updateBusiness(busId: string, business : Business) : Observable<string> {
        return this.businessService.updateBusiness(busId, business);
    }

    public getBusinessExpenses(busId : string, month : string, year: string, isyearly : boolean) : Observable<Expense[]> {
        return this.businessService.getBusinessExpenses(busId, month, year, isyearly);
    }

    /**
     *  STAFF APIS
     */

    public saveStaff(business : Business)  : Observable<string>{
        return this.staffService.saveStaff(business);
    }
    public getStaff(busId : string, staffId : string) : Observable<Staff> {
        return this.staffService.getStaff(busId, staffId);
    }

    public getStaffById(staffId : string) : Observable<Staff> {
        let staff = this.staffService.getStaffById(staffId);
        return staff;
    }

    public getAppointment(slotId : string) : Observable<AppointmentSlot>{
        return this.apptService.getAppointment(slotId);
    }
    public saveAppointment(appt : any) : Observable<string>{
        return this.apptService.saveAppointment(appt);
    }
    public createAppointment(appt : any) : Observable<AppointmentSlot>{
        return this.apptService.createAppointment(appt);
    }

    public getUserDetails(userEmail : string) : Observable<User>{
        return this.userService.getUser(userEmail);
    }

    public getTrendingBusiness() : Business[] {
        return trendingBusiness;
    }

    public getRecentlyVisitedBusiness() : Business[] {
        return recentlyVisitedBusiness;
    }

    public getSearchResults(searchTerm : string, prop:string) : Observable<SearchVO> {
        this.mainPageUnLoaded.next(true);
        return this.searchService.invokeSearch(searchTerm, prop);
    }

    public getFacetedSearchResults(searchTerm : string, prop:string, facetMap : Map<string, string[]>) : Observable<SearchVO> {
        if(facetMap && facetMap.size > 0){
            return this.searchService.facetFilter(searchTerm, prop, facetMap);
        }
        return this.getSearchResults(searchTerm, prop);
    }

    public getAppointmentSlots(business : Business, staff : Staff, 
        selectedDate : Date) : Observable<AppointmentSlot[]> {
        return this.apptService.findAvailableSlots(business.bus_id, staff.staff_id, selectedDate);
    }

    public getAllAppointmentsByUser(sId : string) : Observable<AppointmentSlot[]> {
        return this.apptService.slotsByUserId(sId);
    }

    public cancelAppointment(sId : string) : Observable<string> {
        return this.apptService.cancelAppointment(sId);
    }

    public deleteFile(fileName : string) : Observable<String> {
        return this.s3ImageService.deleteFile(fileName);
    }

    public getAllCategories() : Array<Category>{
        let cate1 = new Category({"categoryName" : "Dentists", "categoryCode":"HEALTH", "image":"dentist-pain-borowac-cure-52527.jpeg", "description":""});
        let cate2 = new Category({"categoryName" : "Doctors", "categoryCode":"HEALTH", "image":"dentist-pain-borowac-cure-52527.jpeg", "description":""});
        let cate3 = new Category({"categoryName" : "Tax Professional", "categoryCode":"FINANCE", "image":"dentist-pain-borowac-cure-52527.jpeg", "description":""});
        let cate4 = new Category({"categoryName" : "House Services", "categoryCode":"HOME", "image":"dentist-pain-borowac-cure-52527.jpeg", "description":""});
        let cate5 = new Category({"categoryName" : "Health & Beauty", "categoryCode":"BEAUTY", "image":"dentist-pain-borowac-cure-52527.jpeg", "description":""});
        let cate6 = new Category({"categoryName" : "Legal Services", "categoryCode":"LEGAL", "image":"dentist-pain-borowac-cure-52527.jpeg", "description":""});
        let categories = [cate1, cate2, cate3, cate4, cate5, cate6];
        return categories;
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

    public activateUser(hash : string) : Observable<string> {
        return this.userService.activateUser(hash);
    }

    public findRouteForSuccessLogin() : Observable<string> {
        return this.userService.findRouteForSuccessLogin();
    }

    public removequotes(imageName:string) : string{
        if(imageName.charAt(0) === '"')
        {
          imageName = imageName.substr(1);
        }
        if(imageName.charAt(imageName.length - 1) === '"')
        {
          imageName = imageName.substr(0, imageName.length - 1);
        }
        return imageName;
    }
}