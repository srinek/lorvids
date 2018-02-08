export class AppointmentSlot{
    appointmentId : string;
    slotTime : Date;
    isAvailable : boolean;
    staffId : string;
    busId : string;
    slotTimeInMillis : number;
    userEmail : string;

    public constructor(src?){
        if(src){
            this.map(src);
        }
    }

    public map(src){
        this.appointmentId = src.AppointmentId;
        this.slotTime = new Date(src.time);//;
        this.slotTimeInMillis = new Date(src.time).getTime();
        this.isAvailable = src.available;
        this.staffId = src.staffId;
        this.busId = src.busId;
        this.userEmail = src.userEmail;
    }
}