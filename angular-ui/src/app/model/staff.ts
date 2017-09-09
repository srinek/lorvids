import {Appointment} from './appointment';

export class Staff {

    id? : number;
    name : string;
    rating? : number;
    about? : string;
    availableSlots : Appointment[];
}