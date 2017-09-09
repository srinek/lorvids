import {Staff} from './staff';

export class Business{

    id : number;
    name : string;
    address : string;
    imageurl : string;
    rating : number[];
    staff? : Staff[];

}