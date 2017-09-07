import { Injectable }    from '@angular/core';
import {Subject} from 'rxjs/Subject';

import {Business} from '../model/business.model';
import {Logger} from './logger.service';

@Injectable()
export class AppointmentService {

    mainPageUnLoaded = new Subject<boolean>();

    constructor(private logger: Logger){

    }

    private rating : number[] = [0 , 0 , 0 ,0 ];

    private trendingBusiness : Business[] = [
        {id: 1, name : "Smile Dental", address : "110 Durham Road, Piscataway", imageurl : "", rating : this.rating},
        {id: 2, name : "Bubbles Pediatrician", address : "1145 fifth avenue, Edison", imageurl : "", rating : this.rating},
        {id: 3, name : "Trendy Looks (Salon)", address : "1145 fifth avenue, Edison", imageurl : "", rating : this.rating},
        {id: 4, name : "A1 Cleaners", address : "1145 fifth avenue, Edison", imageurl : "", rating : this.rating}
    ];

    private recentlyVisitedBusiness : Business[] = [
        {id: 1, name : "Smile Dental", address : "110 Durham Road, Piscataway", imageurl : "", rating : this.rating},
        {id: 2, name : "Bubbles Pediatrician", address : "1145 fifth avenue, Edison", imageurl : "", rating : this.rating},
        {id: 3, name : "Trendy Looks (Salon)", address : "1145 fifth avenue, Edison", imageurl : "", rating : this.rating},
        {id: 4, name : "A1 Cleaners", address : "1145 fifth avenue, Edison", imageurl : "", rating : this.rating}
    ];

    private searchResults : Business[] = [
        {id: 1, name : "Smile Dental", address : "110 Durham Road, Piscataway", imageurl : "../../assets/trendy_looks.jpg", rating : this.rating},
        {id: 2, name : "Bubbles Pediatrician", address : "1145 fifth avenue, Edison", imageurl : "../../assets/home_cleaning.jpg", rating : this.rating},
        {id: 3, name : "Trendy Looks (Salon)", address : "1145 fifth avenue, Edison", imageurl : "../../assets/trendy_looks.jpg", rating : this.rating},
        {id: 4, name : "A1 Cleaners", address : "1145 fifth avenue, Edison", imageurl : "../../assets/home_cleaning.jpg", rating : this.rating}
    ];

    public getTredingBusiness() : Business[] {
        return this.trendingBusiness;
    }

    public getRecentlyVisitedBusiness() : Business[] {
        return this.recentlyVisitedBusiness;
    }

    public getSearchResults(searchTerm : string) : Business[] {
        this.mainPageUnLoaded.next(true);
        return this.searchResults;
    }

    public triggerMainPageLoaded(){
        this.mainPageUnLoaded.next(false);
    }
}