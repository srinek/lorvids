import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../service/authentication.service';
import { User } from '../../model/user.model';

@Component({
  selector: 'app-confirm-user',
  templateUrl: './confirm-user.component.html',
  styleUrls: ['./confirm-user.component.css']
})
export class ConfirmUserComponent implements OnInit {

  public error : boolean = false;
  public errorMessage : string = "";
  //confirmUserForm: any; 
  uemail : string;
  upassword : string;
  ucode : string;

  constructor(private authenticationService : AuthenticationService,
    private router: Router,
    private route: ActivatedRoute) { 
    /* this.confirmUserForm = {
      "email":"",
      "password":""
    } */
  }

  ngOnInit() {
    console.log("authenticated user ", this.authenticationService.tempSignupUser);
  }

  confirmUser(){
    console.log("msg ", this.ucode, this.uemail, this.upassword);
    const user = new User();
    user.UserEmail = this.uemail;
    user.confirmationCode = this.ucode;
    user.password = this.upassword;
    this.authenticationService.confirmUser(user).subscribe((result) => {
      this.router.navigate(['addb']);
    },
    (error) => {
      this.error = true;
      this.errorMessage = error;
    }
    );
  }
}
