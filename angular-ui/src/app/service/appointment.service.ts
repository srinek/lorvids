import { Injectable }    from '@angular/core';

import {Business} from '../model/business.model';
import {Logger} from './logger.service';
import {SearchService} from './search.service';
import { Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

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

    

    public triggerMainPageLoaded(){
        this.mainPageUnLoaded.next(false);
    }
}