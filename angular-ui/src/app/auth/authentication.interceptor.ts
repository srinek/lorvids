import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from '../service/authentication.service';
 
@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

    constructor(private authenticationService : AuthenticationService){

    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let currentUser = this.authenticationService.getCurrentUserJwtToken();
        currentUser.subscribe( (result) => {
            request = request.clone({
                setHeaders: {
                    Authorization: result
                }
            });
        },(error) => {

        }, () => {

        }); 
        return next.handle(request);
    }
}