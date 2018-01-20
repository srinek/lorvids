import { Injectable } from "@angular/core";
import {Http, Response} from '@angular/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { Logger } from "./logger.service";
import { SearchVO } from "../model/search-vo";



@Injectable()
export class S3ImageService{

    api : string = environment.appurl;
    endpoint : string = "/pic/";
    constructor( private http : Http,
        private logger : Logger){

    }

    deleteFile(filename : string) : Observable<string>{
        let fileparts : string[] = filename.split("/");
        let lclName = fileparts[fileparts.length-1];
        return this.http.delete(this.api+this.endpoint+lclName)
            .map((response : Response) => {
               console.log("response ", response);
               return response;
           }
       )
       .catch(
           (error: Response) => {
               console.log("response ", error);
               return Observable.throw(error);
           }
        );
    }
}