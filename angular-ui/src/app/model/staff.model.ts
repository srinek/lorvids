import {Slots} from './slots.model';
import {AppointmentSlot} from './appointment-slot.model';
import { Business } from './business.model';
import { StaffPractice } from './staff-practice.model';

export class Staff {

    staff_id : string;
    staff_name : string;
    rating? : number;
    tags : string;
    practices : StaffPractice[] = [];
    images : string[] = [];
    image : string;
    about : string;
    affliations : string;
    awards : string;

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
        this.tags = src.tags;
        this.images = src.imageUrl;
        if(src.imageUrl && src.imageUrl.length > 0){
            this.image = src.imageUrl[0];
        }
        let practice = new StaffPractice(src);
        this.practices.push(practice);
        this.about = src.profStatement;
    }

    public mapArray(src) : void {
        src.forEach(element => {
            this.map(element);
        });
    }
}