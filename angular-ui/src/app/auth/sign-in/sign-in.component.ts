import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../service/authentication.service';
import { User } from '../../model/user.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  userEmail : string;
  userPwd : string;
  
  constructor( private authenticationService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute) { 

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
        this.router.navigate(['addb']);
      }, 
      (error) => {
        console.error("login error");
      },
      () => {

      }
    );

  }



}
