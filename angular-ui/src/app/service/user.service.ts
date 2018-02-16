import { Injectable }    from '@angular/core';
import {Http, Response} from '@angular/http';

import {Observable} from 'rxjs/Observable';

import {Business} from '../model/business.model';

import {Logger} from './logger.service';
import { environment } from '../../environments/environment';
import { Slots } from '../model/slots.model';
import { AppointmentSlot } from '../model/appointment-slot.model';
import { User } from '../model/user.model';

@Injectable()
export class UserService {

    api : string = environment.appurl;
    endpoint : string = "user";

    constructor(private http : Http,
        private logger : Logger){

    }

    public getUser(userEmail : string) : Observable<User>{
        return this.http.get(this.api + this.endpoint+"/"+ userEmail).map(
            (response : Response) => {
                let res = response.json();
                let userData = new User(res);
                return userData;
            }
        ).catch(
            (error: Response) => {
              return Observable.throw(error);
            }
        );
    }
    public saveAppointment(appt : any) : Observable<string>{
        return this.http.post(this.api + this.endpoint + "?saveuser=true", appt).map(
            (response : Response) => {
                let res = response.json();
                return res;
            }
        );
    }
}