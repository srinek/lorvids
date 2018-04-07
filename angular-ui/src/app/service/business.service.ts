import { Injectable }    from '@angular/core';
import {Http, Response} from '@angular/http';

import {Observable} from 'rxjs/Observable';

import {Business} from '../model/business.model';

import {Logger} from './logger.service';
import { environment } from '../../environments/environment';
import { Expense } from '../model/expense.model';
import { Appointment } from '../model/appointment.model';

@Injectable()
export class BusinessService {

    api : string = environment.appurl;
    endpoint : string = "business";
    expenseEndpoint : string = "business/expense"

    constructor(private http : Http,
        private logger : Logger){

    }

    public getBusiness(busid : string, loadStaff : boolean) : Observable<Business>{
        return this.http.get(this.api + this.endpoint+"/"+busid+"?loadStaff="+loadStaff).map(
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
                if(response.status === 200){
                    let json = response.json();
                    return json.bus_id;
                }
                this.logger.consoleLog("error in save business ", response.json());
                return response.json();
            }
        ).catch(
            (error: Response) => {
              return Observable.throw(error);
            }
        ); 
    }

    public updateBusiness(busid : string, business : Business) : Observable<string>{
        return this.http.post(this.api + this.endpoint+"/"+busid, business.getBusinessJsonToSave()).map(
            (response : Response) => {
                let result : string;
                if(response.status === 200){
                    let json = response.json();
                    return json.result;
                }
                this.logger.consoleLog("error in save business ", response.json());
                return response.json();
            }
        ).catch(
            (error: Response) => {
              return Observable.throw(error);
            }
        );
    }

    public getBusinessExpenses(busId : string, month : string, year: string, isyearly : boolean)  : Observable<Expense[]>{

        var apiUrl = this.api + this.expenseEndpoint+"/"+busId;
        apiUrl += "?month=" + month + "&year=" + year + "&isyearly=" + isyearly;

        console.log("getBusinessExpenses", apiUrl);

        return this.http.get(apiUrl).map(
            (response : Response) => {
                let expense : Expense[] = [];
                let expenseArr = response.json();

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