import { Component, OnInit } from '@angular/core';
import { FacadeService } from '../service/facade.service';
import { Logger } from '../service/logger.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-activate-user',
  templateUrl: './activate-user.component.html',
  styleUrls: ['./activate-user.component.css']
})
export class ActivateUserComponent implements OnInit {

  public error : boolean = false;
  public errorMessage : string = "";
  userActivated : boolean = false;
  
  constructor(private facadeService : FacadeService,
    private route : ActivatedRoute,
    private logger: Logger) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params : Params) => {
        let hash = params['hash'];
        this.facadeService.activateUser(hash)
        .subscribe(
            (result : String) => {
              this.userActivated = true;
            },
            (error : string) => {
              this.userActivated = false;
              this.error = true;
              this.errorMessage = error;
            }
        )
      }
    );
    
  }

}
