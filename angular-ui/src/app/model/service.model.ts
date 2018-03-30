export class Service {

    name : string  = "";
    cost : string = "";
    duration : string = "";
    description : string = "";
    
    constructor(src?){
        if(src){
            this.map(src);
        }
    }

    private map(src){
        this.name = src.name;
        this.cost = src.cost;
        this.duration = src.duration;
        this.description = src.description;
    }
}