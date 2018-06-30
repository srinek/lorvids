export class AppointmentSlot{
    appointmentId : string;
    slotTime : Date;
    isAvailable : boolean;
    staffId : string;
    busId : string;
    slotTimeInMillis : number;
    userEmail : string;
    status : string;
    bus_name : string;
    staff_name : string;
    bus_image : string;
    staff_image : string;
    bus_address : string;
    bus_phone : string;

    public constructor(src?){
        if(src){
            this.map(src);
        }
    }

    public map(src){
        this.appointmentId = this.getAppointmentId(src);
        this.slotTime = new Date(src.time);//;
        this.slotTimeInMillis = new Date(src.time).getTime();
        this.isAvailable = src.available;
        this.staffId = this.getStaffIf(src);
        this.busId = this.getBusinessId(src);
        this.userEmail = src.userEmail;
        this.status = src.status;
        this.bus_name = src.bus_name ? src.bus_name : "old data";
        this.staff_name = src.staffName ? src.staffName : "old data";
        this.bus_image = src.busImage ? src.busImage : "old data";
        this.staff_image = src.staffImage ? src.staffImage : "profile.jpg";
        this.bus_address = src.location ? src.location : "110 Main Street, Edison, NJ 08817";
        this.bus_phone = src.bus_phone ? src.bus_phone : "old data";
    }

    private getAppointmentId(src){
        if(src.AppointmentId){ // dynamo db has w/o _
            return src.AppointmentId;
        }
        return src.appointment_id;  // ES has with _
    }

    private getStaffIf(src){
        if(src.staffId){ // dynamo db has w/o _
            return src.staffId;
        }
        return src.staff_id; // ES has with _
    }

    private getBusinessId(src){
        if(src.busId){ // dynamo db has w/o _
            return src.busId;
        }
        return src.bus_id; // ES has with _
    }

    public isConfirmed(){
        return this.status === "confirmed";
    }

    public isPending(){
        return this.status === "pending";
    }

    public isCancelled(){
        return this.status === "cancelled";
    }
}