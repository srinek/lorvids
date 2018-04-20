import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../service/authentication.service';
import { User } from '../../model/user.model';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  userEmail : string;
  userPwd : string;
  
  constructor( private authenticationService: AuthenticationService) { 

  }

  ngOnInit() {
  }

  login(){
    let user = new User();
    user.UserEmail = this.userEmail;
    user.password = this.userPwd;
    console.log(" loginForm form ", user);
    this.authenticationService.login(user).subscribe(
      (result)=>{
        console.log("login success");
      }, 
      (error) => {
        console.error("login error");
      },
      () => {

      }
    );

  }



}
