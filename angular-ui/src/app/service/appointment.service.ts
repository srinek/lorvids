import { Injectable }    from '@angular/core';
import {Subject} from 'rxjs/Subject';

import {Business} from '../model/business.model';
import {Logger} from './logger.service';

//test imports
import {trendingBusiness,recentlyVisitedBusiness, searchResults} from '../test-data/test-data';

@Injectable()
export class AppointmentService {

    mainPageUnLoaded = new Subject<boolean>();

    constructor(private logger: Logger){

    }

    private rating : number[] = [0 , 0 , 0 ,0 ];

    public getTredingBusiness() : Business[] {
        return trendingBusiness;
    }

    public getRecentlyVisitedBusiness() : Business[] {
        return recentlyVisitedBusiness;
    }

    public getSearchResults(searchTerm : string) : Business[] {
        this.mainPageUnLoaded.next(true);
        return searchResults;
    }

    public triggerMainPageLoaded(){
        this.mainPageUnLoaded.next(false);
    }
}