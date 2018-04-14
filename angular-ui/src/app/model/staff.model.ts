import {Slots} from './slots.model';
import {AppointmentSlot} from './appointment-slot.model';
import { Business } from './business.model';
import { StaffPractice } from './staff-practice.model';

export class Staff {

    staff_id : string = "";
    staff_name : string = "";
    staff_email : string = "";
    staff_phone : string = "";
    staff_salary? : number;
    rating? : number = 5;
    tags : string = "";
    practices : StaffPractice[] = [];
    images : string[] = [];
    image : string = "";
    personalStatement : string = "";
    affiliations : string = "";
    awards : string = "";
    staff_languages : string = "";
    bus_hours? : Array<{day:number, endTime?:string, startTime?:string}> = [];
    holidays? : {dates?:Array<string>, weekdays?:Array<number>} = {dates:[], weekdays:[]};
    sameAsBusBusHours : boolean = false;
    service_time : number = 30;
    
    constructor(src?){
        if(Array.isArray(src)){
            this.mapArray(src);
        }
        else if(src){
            this.map(src);
        }
    }

    

    public map(src) : void {
        this.staff_id = src.staff_id;
        this.staff_name = src.staff_name;
        this.staff_email = src.staff_email;
        this.staff_phone = src.staff_phone;
        this.staff_salary = src.staff_salary;
        this.tags = src.tags;
        this.images = src.images;
        if(src.images && src.images.length > 0){
            this.image = src.images[0];
        }
        this.personalStatement = src.personalStatement;
        this.awards = src.awards;
        this.staff_languages = src.staff_languages;
        this.affiliations = src.affiliations;
        this.bus_hours = src.bus_hours;
        this.holidays = src.holidays;
        let practice = new StaffPractice(src); // this is added for staff page.
        //this.practices.push(practice);
        if(this.bus_hours.length === 0){
            this.sameAsBusBusHours = true;
        }
    }

    public mapArray(src) : void {
        src.forEach(element => {
            this.map(element);
        });
    }
}