
var moment = require('moment-timezone');

class BusinessHour{
     

    constructor(src){
        if(src){
            this.map(src);
        }
    }

    map(src){
        let self = this;
        if(src){
           self.startTime = src.startTime;
           self.endTime = src.endTime;
           self.day = src.day;
           self.date = src.date;
        }
        if(!self.date){
            self.date = moment();
        }
    }

    get24HrStartTime(){
        let self = this;
        let splitMeridiem = self.startTime.split(" ");
        let splitTimes = splitMeridiem[0].split(":");
        let _24hr = self.hours12to24(splitTimes[0], self.isPM(splitMeridiem[1]));
        console.log("_24hr", _24hr);
        console.log("mins ", splitTimes[1]);
        let startTime =  self.date.clone();
        return startTime.hour(_24hr).minute(splitTimes[1]).seconds(0).millisecond(0);
    }

    get24HrEndTime(){
        let self = this;
        let splitMeridiem = self.endTime.split(" ");
        let splitTimes = splitMeridiem[0].split(":");
        let _24hr = self.hours12to24(splitTimes[0], self.isPM(splitMeridiem[1]));
        console.log("_24hr", _24hr);
        console.log("mins ", splitTimes[1]);
        let endTime =  self.date.clone();
        return endTime.hour(_24hr).minute(splitTimes[1]).seconds(0).millisecond(0);
    }

    isPM(meridiem){
        return meridiem.toUpperCase() === "PM";
    }

    hours12to24(h, pm) {
        //console.log("h %j pm %j", +h, pm);
        return h == 12 ? (pm ? 12 : 0) : (pm ? (+h + 12) : h);
    }


}
module.exports = BusinessHour;