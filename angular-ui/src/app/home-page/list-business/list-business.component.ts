import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
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

  constructor(private router: Router,private authService: AuthService) { }



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

  ngOnInit() {
    //alert("init")
   /*this.authService.authState.subscribe(
     (user) => {
           console.log(user);
           this.user = user;
           this.loggedIn = (user != null);

           alert(this.user);
       },
       (err) => {
         alert("err "+err)
       }
     );*/
 }


  createbtnClick= function () {
    this.router.navigate(['addb']);
  };

}
