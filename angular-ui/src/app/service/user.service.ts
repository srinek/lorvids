import { Injectable }    from '@angular/core';

import {Observable} from 'rxjs/Observable';

import {Business} from '../model/business.model';

import {Logger} from './logger.service';
import { environment } from '../../environments/environment';
import { Slots } from '../model/slots.model';
import { AppointmentSlot } from '../model/appointment-slot.model';
import { User } from '../model/user.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserService {

    api : string = environment.appurl;
    endpointPrefix : string = "user";

    constructor(private http : HttpClient,
        private logger : Logger){

    }

    public getUser(userEmail : string) : Observable<User>{
        return this.http.get(this.api + this.endpointPrefix+"/"+ userEmail).map(
            (response : any) => {
                let res = response;
                let userData = new User(res);
                return userData;
            }
        ).catch(
            (error: any) => {
              return Observable.throw(error);
            }
        );
    }
    public saveAppointment(appt : any) : Observable<string>{
        return this.http.post(this.api + this.endpointPrefix + "?saveuser=true", appt).map(
            (response : any) => {
                let res = response;
                return res;
            }
        );
    }

    public activateUser(hash:string) : Observable<string>{
        return this.http.get(this.api + this.endpointPrefix+"/activate/"+ hash).map(
            (response : any) => {
                let res = response;
                if(res.status && res.status === "success"){
                    return "success";
                }
                return Observable.throw(response);
            }
        ).catch(
            (error: any) => {
              return Observable.throw(error);
            }
        );
    }

    public findRouteForSuccessLogin() : Observable<string> {
        return this.http.get(this.api + this.endpointPrefix + '/loginpass').
        map( (response : any) => {
            return response.route;
        }).catch( (error : any) => {
            return Observable.throw(error);
        });
    }
}