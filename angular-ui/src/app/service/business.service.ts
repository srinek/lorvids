import { Injectable }    from '@angular/core';
import {Response} from '@angular/http';

import {Observable} from 'rxjs/Observable';

import {Business} from '../model/business.model';

import {Logger} from './logger.service';
import { environment } from '../../environments/environment';
import { Expense } from '../model/expense.model';
import { Appointment } from '../model/appointment.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class BusinessService {

    api : string = environment.appurl;
    endpoint : string = "business";
    expenseEndpoint : string = "business/expense"

    constructor(private http : HttpClient,
        private logger : Logger){

    }

    public getBusiness(busid : string) : Observable<Business>{
        return this.http.get(this.api + this.endpoint+"/"+busid).map(
            (response : any) => {
                let business : Business;
                let busObj = response;
                business = new Business(busObj);
                return business;
            }
        ).catch(
            (error) => {
              return Observable.throw(error);
            }
        );
    }

    public saveBusiness(business : Business) : Observable<string>{
        return this.http.post(this.api + this.endpoint, business).map(
            (response : any) => {
                let result : string;
                if(response.result === "success"){
                    return response.bus_id;
                }
                this.logger.consoleLog("error in save business ", response);
                return response;
            }
        ).catch(
            (error) => {
              return Observable.throw(error);
            }
        ); 
    }

    public updateBusiness(busid : string, business : Business) : Observable<string>{
        return this.http.post(this.api + this.endpoint+"/"+busid, business.getBusinessJsonToSave()).map(
            (response : any) => {
                let result : string;
                if(response.status === 200){
                    let json = response;
                    return json.result;
                }
                this.logger.consoleLog("error in save business ", response);
                return response;
            }
        ).catch(
            (error) => {
              return Observable.throw(error);
            }
        );
    }

    public getBusinessExpenses(busId : string, month : string, year: string, isyearly : boolean)  : Observable<Expense[]>{

        var apiUrl = this.api + this.expenseEndpoint+"/"+busId;
        apiUrl += "?month=" + month + "&year=" + year + "&isyearly=" + isyearly;

        console.log("getBusinessExpenses", apiUrl);

        return this.http.get(apiUrl).map(
            (response : any) => {
                let expense : Expense[] = [];
                let expenseArr = response;

                if (expenseArr) {
                    expenseArr.forEach(element => {
                        expense.push (new Expense(element));
                    });
                }
                return expense;
            }
        );
    }

}