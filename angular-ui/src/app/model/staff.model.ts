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

    constructor(src?){
        if(src){
            this.map(src);
        }
    }

    public getAvailableSlots(onDate : Date) : AppointmentSlot[]{
        //find booked slots
        //compute available slots
        let slots = [];
        for(var i = 0; i < 9; i++){
            let slot = new AppointmentSlot();
            slot.bookingId = this.staff_id+"-slot-"+i;
            slot.isAvailable = true;
            slot.slotTime = (2.00 + i ) +" PM";
            slot.specialInstruction = "be on time";
            slots.push(slot);
        }
        return slots;
    }

    public map(src) : void {
        this.staff_id = src.staff_id;
        this.staff_name = src.staff_name;
        this.tags = src.tags;
        this.service_time = src.service_time;
        this.bus_hours = src.bus_hours;
        this.holidays = src.holidays;
    }
}