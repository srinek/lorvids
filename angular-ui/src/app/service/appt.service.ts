import { Injectable }    from '@angular/core';
import {Http, Response} from '@angular/http';

import {Observable} from 'rxjs/Observable';

import {Business} from '../model/business.model';

import {Logger} from './logger.service';
import { environment } from '../../environments/environment';
import { Slots } from '../model/slots.model';
import { AppointmentSlot } from '../model/appointment-slot.model';
import { Appointment } from '../model/appointment.model';

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

    public findAvailableSlots(busId : string, staffId: string,  date) : Observable<AppointmentSlot[]>{
        if(!date){
            date = "";
        }
        else{
            date = date.getTime();
        }
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

    public getBusinessBookedAppointments(busId : string, month : string, year: string, isyearly : boolean)  : Observable<Appointment []>{

        var apiUrl = this.api + this.endpoint + "/" + "business/" + busId;
        apiUrl += "?month=" + month + "&year=" + year + "&isyearly=isyearly";

        console.log("getBusinessBookedAppointments", apiUrl);

        return this.http.get(apiUrl).map(
            (response : Response) => {
                let appointments  : Appointment [] = [];
                let appointmentArr  = response.json();

                if (appointmentArr) {
                    appointmentArr.forEach(element => {
                        appointments.push(new Appointment(element));
                    });
                }
                return appointments;
            }
        );
    }

}