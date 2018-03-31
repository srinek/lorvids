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
    affliations : string = "";
    awards : string = "";
    staff_languages : string = "";

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
        this.images = src.imageUrl;
        if(src.imageUrl && src.imageUrl.length > 0){
            this.image = src.imageUrl[0];
        }
        let practice = new StaffPractice(src);
        this.practices.push(practice);
        this.personalStatement = src.profStatement;
        this.affliations = src.affliations;
    }

    public mapArray(src) : void {
        src.forEach(element => {
            this.map(element);
        });
    }
}