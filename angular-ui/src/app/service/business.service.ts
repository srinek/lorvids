import { Injectable }    from '@angular/core';
import {Http, Response} from '@angular/http';

import {Observable} from 'rxjs/Observable';

import {Business} from '../model/business.model';

import {Logger} from './logger.service';

@Injectable()
export class BusinessService {

    api : string = " https://htb4u6t274.execute-api.us-east-1.amazonaws.com/dev/";//"https://eg8guymbvl.execute-api.us-east-1.amazonaws.com/dev/";
    endpoint : string = "business";

    constructor(private http : Http,
        private logger : Logger){

    }

    public getBusiness(busid : string) : Observable<Business>{

        return this.http.get(this.api + this.endpoint+"/"+busid).map(
            (response : Response) => {
                let business : Business;
                let busObj = response.json();
                business = new Business(busObj);
                return business;
            }
        );
    }

    public saveBusiness(business : Business) : Observable<string>{
        return this.http.post(this.api + this.endpoint, business).map(
            (response : Response) => {
                let result : string;
                let json = response.json();
                if(json.statusCode === 200){
                    return "success";
                }
                this.logger.consoleLog("error in save business ", json.body);
                return json.body;
            }
        );
    }
}