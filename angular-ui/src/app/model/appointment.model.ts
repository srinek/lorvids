
export class Appointment {

    staffId : string;
    userEmail : string;
    AppointmentId : string;
    busId : string;
    location : string;
    time :  Date;
    notes : string;
    service : string;
    checkin: Date;
    checkout: Date;

    constructor(private json? : string){
        if(json){
            this.map(json);
        }
    }

    public map(src) : void {
        this.staffId = src.staff_id;
        this.userEmail = src.user_email;
        this.AppointmentId = src.appointment_id;
        this.busId = src.bus_id;
        this.location = src.location;
        this.time = src.time;
        this.notes = src.notes;
        this.service = src.service;
        this.checkin = src.checkin;
        this.checkout = src.checkout;
    }
}