export class AppointmentSlot{
    appointmentId : string;
    slotTime : Date;
    isAvailable : boolean;
    staffId : string;
    busId : string;

    public constructor(src?){
        if(src){
            this.map(src);
        }
    }

    public map(src){
        this.appointmentId = src.appointmentId;
        this.slotTime = new Date(src.time);//;
        this.isAvailable = src.available;
        this.staffId = src.staffId;
        this.busId = src.busId;
    }
}