

export class Month {

    private index : string;
    private fullName : string;
    private shortName : string;

    constructor(index:string, shortName:string, fullName:string){
        this.index = index;
        this.shortName = shortName;
        this.fullName = fullName;
    }

    public getIndex(){
        return this.index;
    }

    public getShortName() {
        return this.shortName;
    }

    public getFullName() {
        return this.fullName;
    }
    
}