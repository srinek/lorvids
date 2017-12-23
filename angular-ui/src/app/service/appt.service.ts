import { Injectable }    from '@angular/core';
import {Http, Response} from '@angular/http';

import {Observable} from 'rxjs/Observable';

import {Business} from '../model/business.model';

import {Logger} from './logger.service';
import { environment } from '../../environments/environment';
import { Slots } from '../model/slots.model';
import { AppointmentSlot } from '../model/appointment-slot.model';

@Injectable()
export class ApptService {

    api : string = environment.appurl;
    endpoint : string = "appt";
    endpointslots : string = "slots";

    constructor(private http : Http,
        private logger : Logger){

    }

    public saveAppointment(appt : any) : Observable<string>{
        return this.http.post(this.api + this.endpoint + "?saveuser=true", appt).map(
            (response : Response) => {
                let res = response.json();
                return res;
            }
        );
    }

    public findAvailableSlots(busId : string, staffId: string,  date:number) : Observable<AppointmentSlot[]>{
        return this.http.get(this.api + this.endpointslots+"/"+busId+"/"+staffId+"?d="+date).map(
            (response : Response) => {
                let res = response.json();
                let appointmentSlots : AppointmentSlot[] = [];
                if(Array.isArray(res)){
                    res.forEach((elem) => {
                        appointmentSlots.push(new AppointmentSlot(elem));
                    });
                }
                return appointmentSlots;
            }
        );
    }
}