import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable'
import {Logger} from './logger.service';
import {Business} from '../model/business.model';
import {staff} from '../test-data/test-data';
import { environment } from '../../environments/environment';

@Injectable()
export class SearchService{

    searchUrl : string = environment.searchurl;

    constructor( private http : Http,
                 private logger : Logger){

    }

    public invokeSearch(searchTerm : string) : Observable<Business[]>{
        this.logger.log("search invoked "+this.searchUrl + " search term "+searchTerm);
        var businessList : Business[] = [];
        return this.http.post(this.searchUrl, 
                            '{"query" : { "match" : { "_all" : "'+searchTerm+'" } } }'
                        ).map((response : Response) => {
                for(const hit of response.json().hits.hits){
                    var business = new Business(hit._source);
                    business.imageurl = "../../assets/trendy_looks.jpg";
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