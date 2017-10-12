import {Slots} from './slots.model';
import {AppointmentSlot} from './appointment-slot.model';

export class Staff {

    staff_id : number;
    staff_name : string;
    rating? : number;
    tags : string;
    service_time : string;
    bus_hours : any = {};
    holidays : string = "";

    public getAvailableSlots(onDate : Date) : AppointmentSlot[]{
        //find booked slots
        //compute available slots
        return null;
    }
}