import { CanActivate, Router,
     ActivatedRouteSnapshot, 
     RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { AuthenticationService } from "../service/authentication.service";

@Injectable()
export class AuthenticationGuard implements CanActivate{

    constructor(private router: Router,
    private authenticationService : AuthenticationService) { }
 
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.authenticationService.isAuthenticated();
    }
}