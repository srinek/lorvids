'use strict'
let moment = require('moment');

class Staff{
    constructor(src){
        if(src){
            this.map(src);
        }
    }

    map(src){
        let self = this;
        self.staff_id = src.staff_id;
        self.staff_name = src.staff_name;
        self.tags = src.tags;
        self.images = src.imageUrl;
        self.about = src.profStatement;
        self.holidays = src.holidays;
        self.service_time = src.service_time;
        self.bus_hours = src.bus_hours;    
        self.bus_id = src.bus_id;  
    }

    isStaffWorkingDay(onDate){
        let self = this;
        self.holidays && self.holidays.weekdays.forEach(weekholiday => {
            if(weekholiday === onDate.getDay()){
                return false;
            }
        });
        return true;
    }

    getAvailableSlots(onDate){
        let self = this;
        let returnSlots = [];
        console.log("find slots for ", onDate);
        console.log("service time ", self.service_time);
        let hoursOfOperation = self.findBusinessHours(onDate);
        let splitTimes = hoursOfOperation.startTime.split(":");
        let startTime = moment(onDate).hour(splitTimes[0]).minute(splitTimes[1]);
        splitTimes = hoursOfOperation.endTime.split(":");
        let endTime = moment(onDate).hour(splitTimes[0]).minute(splitTimes[1]);
        let slot = startTime;
        while(slot.isBefore(endTime)){
            returnSlots.push({"time" : slot.format("MM-D-YYYY hh:mm:ss a"), 
            "available" : true, "staffid":self.staff_id, 
            "busid" : self.bus_id});
            slot = slot.add(self.service_time, 'm');
        }
        //find booked slots

        //compute available slots
        return returnSlots;
    }

    findBusinessHours(onDate){
        let self = this;
        let retBusinessHours = self.bus_hours.find((elem) => {
            if(elem.day == onDate.getDay()){
                return true;
            }
            return false;
        });
        if(!retBusinessHours){
            retBusinessHours = self.bus_hours.find((elem) => {
                if(elem.day == "-1"){
                    return true;
                }
                return false;
            });
        }
        return retBusinessHours;
    }
}

module.exports = Staff;