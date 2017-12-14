import {Staff} from './staff.model';
import {AppointmentSlot} from './appointment-slot.model';

export class Business{

    bus_id : number;
    bus_name : string;
    address : string;
    phone : number;
    email : string;
    website : string;
    imageurl : string;
    rating : number[];
    staff? : Staff[] =[];
    bus_time_zone? : string = "America/new_york";
    bus_hours? : any = {};
    holidays? : any = {};
    statement_caption? : string = "";
    statement_notes? : string = "";
    specialized_in? : string = "";
    awards? : string = "";
    appointment_instructions? : string[] = [];
    services? : string[] = [];

    constructor(private json? : string){
        if(json){
            this.map(json);
        }
    }

    public getNextBusinessDayDefault() : Date {
        var options = {weekday : 'short' , timeZone : this.bus_time_zone,  timeZoneName: 'short' };
        let utcDate = new Date();
        utcDate.setTime(Date.UTC(utcDate.getFullYear(), utcDate.getMonth(), utcDate.getDay()));
        this.holidays.weekdays.forEach(weekholiday => {
            if(weekholiday === utcDate.getDay()){
                return this.getNextBusinessDay(utcDate);
            }
        });
        // add logic for other holidays
        return utcDate;
    }

    public getNextBusinessDay(from : Date) : Date {
        let nextDay = new Date();
        nextDay.setTime(Date.UTC(from.getFullYear(), from.getMonth(), from.getDay()+1));
        var options = {weekday : 'short' , timeZone : this.bus_time_zone,  timeZoneName: 'short' };
        this.holidays.weekdays.forEach(weekholiday => {
            if(weekholiday === nextDay.getDay()){
                nextDay = this.getNextBusinessDay(nextDay);
            }
        });
        return nextDay;
    }

    public getAvailableSlots(staff : Staff, onDate : Date, 
        offset : number, size : number) : AppointmentSlot[]{
        return staff.getAvailableSlots(onDate, offset, size);
    }

    public map(src) : void {
        this.bus_name = src.bus_name;
        this.address = src.address;
        this.bus_id = src.bus_id;
        
        if(src.staff){
           src.staff.forEach((staffObj) => {
              var staff = new Staff(staffObj);
              this.staff.push(staff);
           });
        }
        this.holidays = src.holidays;
        this.specialized_in = src.specialized_in;
        this.appointment_instructions = src.appointment_instructions.split(',');
        this.awards = src.awards;
        this.imageurl = "../../assets/trendy_looks.jpg";
        this.services = src.services;
    }
}