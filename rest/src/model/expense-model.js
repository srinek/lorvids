'use strict'
var moment = require('moment-timezone');

class Expense {
    constructor(src){
        if(src){
            this.map(src);
        }
    }

    map(src) {
        this.bus_id = src.bus_id;
        this.expense_id = src.expense_id;
        this.cost = src.ost;
        this.createdTime = src.createdTime;
        this.remarks = src.remarks;
        this.type = src.type;
        this.repeatMonth = src.repeatMonth;
        this.staffId = src.staffId;
    }
}

