
export class Appointment {

    staffId : string;
    userEmail : string;
    AppointmentId : string;
    busId : string;
    location : string;
    time :  Date;
    notes : string;
    service : string;

    constructor(private json? : string){
        if(json){
            this.map(json);
        }
    }

    public map(src) : void {
        this.staffId = src.staffId;
        this.userEmail = src.userEmail;
        this.AppointmentId = src.AppointmentId;
        this.busId = src.busId;
        this.location = src.location;
        this.time = src.time;
        this.notes = src.notes;
        this.service = src.service;
    }
}