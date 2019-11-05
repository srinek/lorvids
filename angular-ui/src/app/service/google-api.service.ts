import { Injectable } from "@angular/core";
import { environment } from '../../environments/environment';
import { HttpClient } from "@angular/common/http";
import { Logger } from "./logger.service";
import { Observable } from "rxjs";

@Injectable()
export class GoogleAPIService{

    appUrl : string = environment.appurl;
    authUrlEndpoint : string = "gauthurl";
    
    constructor(private http : HttpClient,
        private logger : Logger){

    }

    saveAuthCode(authCode : string){
        
    }

    getGoogleAuthUrl() : Observable<string>{
        return this.http.get(this.appUrl + this.authUrlEndpoint).map(
            (response : any) => {
                if(response.ack === "1"){
                   return response.url;
                }
                return Observable.throw(response.error);
            }
        ).catch((error: any) => {
            console.error(error);
            return Observable.throw(error);
         });;
    }
}