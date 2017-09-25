import { Injectable }    from '@angular/core';

import {Business} from '../model/business.model';
import {Logger} from './logger.service';
import { URLSearchParams, Http, Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

//test imports
import {trendingBusiness,recentlyVisitedBusiness, searchResults} from '../test-data/test-data';

@Injectable()
export class AppointmentService {

    mainPageUnLoaded = new Subject<boolean>();
    searchResults : Business[] = searchResults;
    restUrl : string = "";

    constructor(private logger: Logger,
                private http : Http){

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
        this.http.get(this.restUrl+"").map(
            (response : Response) => {
                this.logger.log(response.json());
                this.searchResults = JSON.parse(response.json());
            }
        )
        return this.searchResults;
    }

    public triggerMainPageLoaded(){
        this.mainPageUnLoaded.next(false);
    }
}