import {Staff} from './staff.model';

export class Business{

    id : number;
    name : string;
    address : string;
    imageurl : string;
    rating : number[];
    staff? : Staff[];

}