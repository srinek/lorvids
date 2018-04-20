import { Injectable, OnInit } from "@angular/core";
import { User } from "../model/user.model";
import {
    CognitoUserPool,
    CognitoUserAttribute,
    CognitoUser,
    AuthenticationDetails,
    CognitoUserSession
  } from 'amazon-cognito-identity-js';
import { Observable, BehaviorSubject, Subject } from "rxjs";

const POOL_DATA = {
    UserPoolId: '',
    ClientId: ''
};
const userPool = new CognitoUserPool(POOL_DATA);

@Injectable()
export class AuthenticationService{

    private registeredUser: CognitoUser;
    signUpSubject = new BehaviorSubject<string>("");

    signUp(user: User): void {
        const attrList: CognitoUserAttribute[] = [];
        const roleAttribute = {
          Name: 'custom:role',
          Value: user.role
        };
        const nameAttribute = {
          Name: 'name',
          Value: user.name
        };
        attrList.push(new CognitoUserAttribute(roleAttribute));
        attrList.push(new CognitoUserAttribute(nameAttribute));
        userPool.signUp(user.UserEmail, user.password, attrList, null, (err, result) => {
          if (err) {
            this.signUpSubject.error(err);
            return;
          }
          this.registeredUser = result.user;
          this.signUpSubject.complete();
          console.log("registered user object ",  this.registeredUser);
        });
        return;
    }

    confirmUser(email : string, confirmationCode : string) : void{
      const userData = {
        Username: email,
        Pool: userPool
      };
      const cognitUser = new CognitoUser(userData);
      cognitUser.confirmRegistration(confirmationCode, true, (err, result) => {
        if (err) {
          return;
        }
        
      });
    }

    login(user : User) : Subject<string>{
        let loginSubject = new Subject<string>();
        var userData = { 
          Username : user.UserEmail,
          Pool : userPool
        };

        let cognitoUser = new CognitoUser(userData);

        var authenticationData = {
            Username : user.UserEmail,
            Password : user.password,
        };

        var authenticationDetails = new AuthenticationDetails(authenticationData);

        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: function (result) {
                loginSubject.next("success");
            },

            onFailure: function(err) {
              loginSubject.error(err);
            }

        });
        return loginSubject;
    }

    getAuthenticatedUser() {
      return userPool.getCurrentUser() || this.registeredUser;
    }

    getRegisteredUser(){
      return this.registeredUser;
    }

    isAuthenticated(): Observable<boolean> {
        const user = this.getAuthenticatedUser();
        const obs = Observable.create((observer) => {
          if (!user) {
            observer.next(false);
          } else {
            user.getSession((err, session) => {
              if (err) {
                observer.next(false);
              } else {
                if (session.isValid()) {
                  observer.next(true);
                } else {
                  observer.next(false);
                }
              }
            });
          }
          observer.complete();
        });
        return obs;
    }

    getCurrentUserJwtToken() : BehaviorSubject<string> {
        let jwtTokenSubject = new BehaviorSubject<string>("");
        this.getAuthenticatedUser().getSession( (err, session) => {
          if (err) {
            jwtTokenSubject.error(err);
          } else {
            if (session.isValid()) {
              jwtTokenSubject.next(session.getCurrentUserJwtToken());
            } else {
              jwtTokenSubject.error("Invalid Session");
            }
          }
        });
       return jwtTokenSubject;
    }
}