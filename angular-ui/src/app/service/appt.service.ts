import { Injectable }    from '@angular/core';
import {Http, Response} from '@angular/http';

import {Observable} from 'rxjs/Observable';

import {Business} from '../model/business.model';

import {Logger} from './logger.service';
import { environment } from '../../environments/environment';

@Injectable()
export class ApptService {

    api : string = environment.appurl;
    endpoint : string = "appt";

    constructor(private http : Http,
        private logger : Logger){

    }

    public saveAppointment(appt : any) : Observable<string>{
         this.logger.log("appointment "+appt);
        return this.http.post(this.api + this.endpoint + "?saveuser=true", appt).map(
            (response : Response) => {
                let res = response.json();
                return res;
            }
        );
    }
}