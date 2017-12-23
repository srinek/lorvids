import { Business } from "./business.model";


/* model to represent the business practices that a staff paricipates*/
export class StaffPractice{

    service_time : string;
    bus_hours : any = {};
    holidays : string = "";
    bus_id : string;

    constructor(src?){
        if(src){
            this.map(src);
        }
    }

    public map(src) : void {
        
        this.service_time = src.service_time;
        this.bus_hours = src.bus_hours;
        this.holidays = src.holidays;
        this.bus_id = src.bus_id;
    }

}