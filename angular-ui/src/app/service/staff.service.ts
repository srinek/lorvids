import {Injectable} from '@angular/core';

import {Http, Response} from '@angular/http';

import {Observable} from 'rxjs/Observable';
import {Logger} from './logger.service';

import {Staff} from '../model/staff.model';
import { environment } from '../../environments/environment';
import { Business } from '../model/business.model';

@Injectable()
export class StaffService{

    api : string = environment.appurl;
    endpoint : string = "staff";
    staffsEndpoint : string = "staffs";

    constructor(private http : Http,
        private logger : Logger){

    }

    public getStaff(busid : string, staffId : string) : Observable<Staff>{
        return this.http.get(this.api + this.endpoint+"/"+busid +"/" + staffId).map(
            (response : Response) => {
                let staff : Staff;
                let staffObj = response.json();
                staff = new Staff(staffObj);
                return staff;
            }
        );
    }

    public getStaffById(staffId : string) : Observable<Staff>{
        return this.http.get(this.api + this.staffsEndpoint+"/"+ staffId).map(
            (response : Response) => {
                let staff : Staff;
                let staffObj = response.json();
                staff = new Staff(staffObj);
                return staff;
            }
        );
    }

    public saveStaff(business : Business) : Observable<string>{
        console.log( "business -- ", JSON.stringify(business.getJson()));
        return this.http.post(this.api + this.endpoint, business.getJson()).map(
            (response : Response) => {
                let result = response.json();
                return result;
            }
        ).catch((error: Response) => {
           return Observable.throw(error);
        });
    }
}