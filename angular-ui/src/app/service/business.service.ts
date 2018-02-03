import { Injectable }    from '@angular/core';
import {Http, Response} from '@angular/http';

import {Observable} from 'rxjs/Observable';

import {Business} from '../model/business.model';

import {Logger} from './logger.service';
import { environment } from '../../environments/environment';
import { Expense } from '../model/expense.model';

@Injectable()
export class BusinessService {

    api : string = environment.appurl;
    endpoint : string = "business";

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
                    return json.Item.bus_id;
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
        return this.http.get(this.api + this.endpoint+"/"+busId).map(
            (response : Response) => {
                let expense : Expense[];
                let expenseObj = response.json();
                expense.push (new Expense(expenseObj));
                return expense;
            }
        );
    }

}