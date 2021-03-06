import { Injectable } from '@angular/core';

@Injectable()
export class Logger {
  logs: string[] = []; // capture logs for testing
  public log(message: string) {
    this.logs.push(message);    
    console.log(message);
  }

  public consoleLog(message: string, obj? : any){
    if(obj){
      console.log(message, obj);
    }
    else{
      console.log(message);
    }
  }
}