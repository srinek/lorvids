import {Injectable} from '@angular/core';

import {Observable} from 'rxjs/Observable';
import {Logger} from './logger.service';

import {Staff} from '../model/staff.model';
import { environment } from '../../environments/environment';
import { Business } from '../model/business.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class StaffService{

    api : string = environment.appurl;
    endpoint : string = "staff";
    staffsEndpoint : string = "staffs";

    constructor(private http : HttpClient,
        private logger : Logger){

    }

    public getStaff(busid : string, staffId : string) : Observable<Staff>{
        return this.http.get(this.api + this.endpoint+"/"+busid +"/" + staffId).map(
            (response : any) => {
                let staff : Staff;
                let staffObj = response;
                staff = new Staff(staffObj);
                return staff;
            }
        );
    }

    public getStaffById(staffId : string) : Observable<Staff>{
        return this.http.get(this.api + this.staffsEndpoint+"/"+ staffId).map(
            (response : any) => {
                let staff : Staff;
                let staffObj = response;
                staff = new Staff(staffObj);
                return staff;
            }
        );
    }

    public saveStaff(business : Business) : Observable<string>{
        //console.log( "business -- ", JSON.stringify(business.getBusinessJsonToSave()));
        return this.http.post(this.api + this.endpoint, business.getBusinessJsonToSave()).map(
            (response : any) => {
                let result = response;
                return result;
            }
        ).catch((error: any) => {
           return Observable.throw(error);
        });
    }
}