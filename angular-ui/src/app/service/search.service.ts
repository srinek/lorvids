import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable'
import {Logger} from './logger.service';
import {Business} from '../model/business.model';
import {staff} from '../test-data/test-data';


@Injectable()
export class SearchService{

    searchUrl : string = "http://localhost:9200/business_docs/_search";

    constructor( private http : Http,
                 private logger : Logger){

    }

    public invokeSearch(searchTerm : string) : Observable<Business[]>{
        this.logger.log("search invoked "+this.searchUrl + " search term "+searchTerm);
        var businessList : Business[] = [];
        return this.http.get(this.searchUrl).map(
           (response : Response) => {
                for(const hit of response.json().hits.hits){
                    var business = new Business();
                    business.name = hit._source.Bus_Name;
                    business.address = hit._source.Address;
                    business.imageurl = "../../assets/trendy_looks.jpg";
                    business.staff = staff;
                    business.rating = [0 , 0 , 0 ,0 ];
                    businessList[businessList.length] = business;
                }
                return businessList;
           }
       )
       .catch(
           (error: Response) => {
             return Observable.throw(error);
           }
         );
    }
}