import { Injectable }    from '@angular/core';

import {Observable} from 'rxjs/Observable';

import {Business} from '../model/business.model';

import {Logger} from './logger.service';
import { environment } from '../../environments/environment';
import { Slots } from '../model/slots.model';
import { AppointmentSlot } from '../model/appointment-slot.model';
import { Appointment } from '../model/appointment.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ApptService {

    api : string = environment.appurl;
    endpoint : string = "appt";
    endpointNewAppt : string = "appt/new";
    endpointGetAppt : string = "appt";
    endpointslots : string = "slots";

    constructor(private http : HttpClient,
        private logger : Logger){

    }

    public getAppointment(apptId : string) : Observable<AppointmentSlot>{
        return this.http.get(this.api + this.endpointGetAppt+"/"+ apptId).map(
            (response : any) => {
                let res = response;
                let appointmentSlot = new AppointmentSlot(res);
                return appointmentSlot;
            }
        ).catch(
            (error: any) => {
              return Observable.throw(error);
            }
        );
    }
    public saveAppointment(appt : any) : Observable<string>{
        return this.http.post(this.api + this.endpoint + "?saveuser=true", appt).map(
            (response : any) => {
                let res = response;
                return res;
            }
        );
    }

    public createAppointment(appt : any) : Observable<AppointmentSlot>{
        return this.http.post(this.api + this.endpointNewAppt+ "?saveuser=true", appt).map(
            (response : any) => {
                //let res = response;
                let appointmentSlot = new AppointmentSlot(appt);
                return appointmentSlot;
            }
        ).catch(
            (error: any) => {
              return Observable.throw(error);
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
            (response : any) => {
                let res = response;
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

    public slotsByUserId(slotId : string) : Observable<AppointmentSlot[]>{
        return this.http.get(this.api + this.endpointGetAppt+"/apptId/"+slotId).map(
            (response : any) => {
                let res = response;
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

    public cancelAppointment(sId : string) : Observable<string> {
        return this.http.get(this.api + this.endpointslots+"/cancel/"+sId).map(
            (response : any) => {
                let result = response;
                return result;
            }
        );
    }

    public getBusinessBookedAppointments(busId : string, month : string, year: string, isyearly : boolean)  : Observable<Appointment []>{
        
        var appointmentDate = new Date();
        appointmentDate.setFullYear(parseInt(year)); 
        var viewtype = "month";
        if (isyearly) {
            viewtype = "year";
        } else {
            appointmentDate.setMonth(parseInt(month));
        }

        var apiUrl = this.api + this.endpoint + "/" + "business/" + busId;
        apiUrl += "?appointmentdate=" + appointmentDate.getTime() + "&viewtype=" + viewtype;

        console.log("getBusinessBookedAppointments", apiUrl);

        return this.http.get(apiUrl).map(
            (response : any) => {
                let appointments  : Appointment [] = [];
                let appointmentArr  = response;
                
                console.log("appointmentArr:", appointmentArr);

                if (appointmentArr && appointmentArr.hits) {
                    appointmentArr.hits.forEach(element => {
                        appointments.push(new Appointment(element));
                    });
                }
                console.log("appointments:", appointments);
                return appointments;
            }
        );
    }

}