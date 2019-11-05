import { Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm, FormBuilder } from '@angular/forms';
import {AuthService, FacebookLoginProvider, 
  GoogleLoginProvider, SocialUser} from 'angular4-social-login';
import { User } from '../../model/user.model';
import { AuthenticationService } from '../../service/authentication.service';
import { FacadeService } from '../../service/facade.service';


@Component({
  selector: 'app-business-signup',
  templateUrl: './business-signup.component.html',
  styleUrls: ['./business-signup.component.css']
})
export class BusinessSignupComponent implements OnInit {

  private user: SocialUser;
  private loggedIn: boolean;
  error : boolean = false ;
  errorMessage : string = "";
  googleAuthUrl : string = "";

  signUpForm: any; 
  constructor(private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private authenticationService : AuthenticationService,
    private facadeService : FacadeService
  ) {
    this.signUpForm = {
          "name":"",
          "email":"",
          "mobile":"",
          "password":""
    }
  }

  
  // initiate component
  public ngOnInit() {
    this.facadeService.getGoogleAuthUrl().subscribe( 
      (url : string ) => {
        this.googleAuthUrl = url;
      },
      (error) => {
        // error fetching google auth url
      }
    );
  }

 

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID)
    .then( res => {
         this.authService.authState.subscribe(
          (user) => {
                console.log(user);
                this.user = user;
                this.loggedIn = (user != null);
 
            },
            (err) => {
              console.error(err);
            }
          );
    }).
    catch( (error) => {
        console.error(error);
    });
    
  }

  signOut(): void {
    this.authService.signOut();
  }

  createbtnClick() {
    console.log("signupForm ", this.signUpForm);
    let user = new User();
    user.name = this.signUpForm.name;
    user.UserEmail = this.signUpForm.email;
    user.role = "admin";
    user.password = this.signUpForm.password;
    user.phone = this.signUpForm.mobile;
    this.authenticationService.signUp(user);
    this.authenticationService.signUpSubject.subscribe( 
      (result) => {
      
      },
      (error) => {
        console.log("error in signup -- ", error);
        this.error = true;
        this.errorMessage = error.message;
      },
      () => {
        this.router.navigate(['confirmuser'], 
        {queryParams : {'signup' : 'true'}});
      }
    );
  }
}
