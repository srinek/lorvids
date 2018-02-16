import {Staff} from './staff.model';
import {AppointmentSlot} from './appointment-slot.model';

export class Business{

    bus_id : string;
    bus_name : string;
    address : string;
    phone : number;
    email : string;
    website : string;
    images : string[];
    defaultImage : string;
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
    isOpenNow : boolean = false;
    openTime : Date;
    closeTime : Date;

    constructor(private json? : string){
        if(json){
            this.map(json);
        }
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
        this.phone = src.phone;
        this.email = src.email;
        this.holidays = src.holidays;
        this.specialized_in = src.specialized_in;
        this.appointment_instructions = src.appointment_instructions;
        this.awards = src.awards;
        this.images = ["../../assets/trendy_looks.jpg", "../../assets/image-2.jpg"];
        this.defaultImage = "../../assets/trendy_looks.jpg";
        this.mapServices(src);
        this.bus_hours = src.bus_hours;
        this.bus_time_zone = src.bus_time_zone;
        this.openTime = src.startTime;
        this.closeTime = src.endTime;
        this.isOpenNow = src.open;
        this.website = "wwww.lorvids.com";
        this.email = "info@lorvids.com";
    }

    private mapServices(src) : void {
        if(src.services){
            src.services.forEach( (service) => {
                this.services.push(service.name);
            });
        }
    }

    public findStaff(staffId : string) : Staff{
        if(this.staff){
            return this.staff.find( (eachStaff) => {
                return eachStaff.staff_id === staffId;
            });
        }
        return null;
    }
}