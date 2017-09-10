import {AvailableSlots} from './available-slots.model';

export class Staff {

    id? : number;
    name : string;
    rating? : number;
    about? : string;
    availableSlots : AvailableSlots[];
}