
export class SearchFacet{

    public name : string = "";
    public values : any = [];

    public constructor(private facetname){
       this.name = facetname
    }

    public addValue(value, docCount){
        this.values.push({key : value, docCount : docCount });
    }
}