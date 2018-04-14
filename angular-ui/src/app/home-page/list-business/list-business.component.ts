import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
//import { FormsModule } from '@angular/forms';
import {  
  FormBuilder,  
  FormGroup,  
  Validators,  
  AbstractControl  ,ReactiveFormsModule 
} from '@angular/forms';
import {
  AuthService,
  FacebookLoginProvider,
  GoogleLoginProvider,
  SocialUser
} from 'angular4-social-login';

@Component({
  selector: 'app-list-business',
  templateUrl: './list-business.component.html',
  styleUrls: ['./list-business.component.css']
})
export class ListBusinessComponent implements OnInit {

  private user: SocialUser;
  private loggedIn: boolean;

  signUpForm: any; 
  constructor(private router: Router,private authService: AuthService,private formBuilder: FormBuilder) {
    this.signUpForm = {
          "firstName":"",
          "lastName":"",
          "email":"",
          "mobile":"",
          "password":""
    }
   }

  
  // initiate component
  public ngOnInit() {
    //this.buildForm();
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID)
    .then(
     res => { // Success
       alert("success")
        this.authService.authState.subscribe(
         (user) => {
               console.log(user);
               this.user = user;
               this.loggedIn = (user != null);

               //alert(this.user);
           },
           (err) => {
             alert("err "+err)
           }
         );
     },
     err =>{
       alert("error")
     }
   )
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID) .then(
      res => { // Success
        alert("success")
         this.authService.authState.subscribe(
          (user) => {
                console.log(user);
                this.user = user;
                this.loggedIn = (user != null);
 
                //alert(this.user);
            },
            (err) => {
              alert("err "+err)
            }
          );
      },
      err =>{
        alert("error")
      }
    )
  }

  signOut(): void {
    this.authService.signOut();
  }

  


  createbtnClick= function () {
    this.router.navigate(['addb']);
  };

}
