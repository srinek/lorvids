export class Category{

    categoryName : string;
    categoryCode : string;
    image : string;
    description : string;

    constructor(src){
        if(src){
            this.map(src);
        }
    }

    public getCategoryName(){
        return this.categoryName;
    }

    public getCategoryCode(){
        return this.categoryCode
    }

    public getImage(){
        return this.image;
    }

    public getDescription(){
        return this.description;
    }

    private map(src){
        this.categoryCode = src.categoryCode;
        this.categoryName = src.categoryName;
        this.image = src.image;
        this.description = src.description;
    }

    public showStaffAffliations(){
        return this.categoryCode === "HEALTH";
    }
}