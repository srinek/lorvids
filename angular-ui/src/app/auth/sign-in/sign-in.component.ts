import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../service/authentication.service';
import { User } from '../../model/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FacadeService } from '../../service/facade.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  userEmail : string;
  userPwd : string;
  error : boolean = false;
  errorMessage : string;
  
  constructor( private authenticationService: AuthenticationService,
    private facadeService : FacadeService,
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
        this.facadeService.triggerLoginSubject(true);
        console.log("login success");
        //this.router.navigate(['addb']);
        this.facadeService.findRouteForSuccessLogin().subscribe( (nextRoute : string) => {
          if(nextRoute === "viewAppts"){
            //this.router.navigate(['addb']);
          }
          else {
            this.router.navigate([nextRoute]);
          }
        }),
        (error) => {
          console.error("login error");
          this.error = true;
          this.errorMessage = error;
        }
      },
      (error) => {
        console.error("login error", error);
        this.error = true;
        this.errorMessage = error.message;
      }
      
    );

  }



}
