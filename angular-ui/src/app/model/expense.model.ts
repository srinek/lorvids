
export class Expense {

    bus_id : string;
    expense_id : string;
    cost : string;
    createdTime : Date;
    remarks : string;
    type : string;
    repeatMonth : boolean = false;
    staffId : string;

    constructor(private json? : string){
        if(json){
            this.map(json);
        }
    }

    public map(src) : void {
        this.bus_id = src.bus_id;
        this.expense_id = src.expense_id;
        this.cost = src.cost;
        this.createdTime = src.createdTime;
        this.remarks = src.remarks;
        this.type = src.type;
        this.repeatMonth = src.repeatMonth;
        if (src.staffId) {
            this.staffId = src.staffId;
        }
    }
}