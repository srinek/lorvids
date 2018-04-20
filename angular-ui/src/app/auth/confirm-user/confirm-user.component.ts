import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../service/authentication.service';

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

  constructor(private authenticationService : AuthenticationService) { 
    /* this.confirmUserForm = {
      "email":"",
      "password":""
    } */
  }

  ngOnInit() {

  }

  confirmUser(){
    console.log("msg ", this.uemail, this.upassword);
    this.authenticationService.confirmUser(this.uemail, this.upassword);
  }
}
