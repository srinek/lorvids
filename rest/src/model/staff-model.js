'use strict'
var moment = require('moment-timezone');
let BusinessHour = require('./business-hour-model');
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
        self.images = src.images;
        self.about = src.profStatement;
        self.holidays = src.holidays;
        self.service_time = src.service_time;
        self.bus_hours = src.bus_hours;    
        self.bus_id = src.bus_id;
        self.staff_email = src.staff_email;
        self.awards = src.awards;
        self.bus_id = src.bus_id;
        self.personalStatement = src.personalStatement;
        self.practices = src.practices;
        self.rating = src.rating;
        self.service_time = src.service_time;
        self.staff_email = src.staff_email;
        self.staff_languages = src.staff_languages;
        self.staff_phone = src.staff_phone;
        self.affiliations = src.affiliations;
        self.education = src.education;
        self.service_specialities = src.service_specialities;
        self.staff_profession = src.staff_profession;
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

    getAvailableSlots(onDate, bookedSlots, timezone){
        let self = this;
        let returnSlots = [];
        console.log("find slots for ", onDate);
        //console.log("service time ", self.service_time);
        let hoursOfOperation = self.findBusinessHours(onDate);
        let startTime =  hoursOfOperation.get24HrStartTime();
        let endTime =  hoursOfOperation.get24HrEndTime();
        let currentTime = moment.tz(new Date(), timezone);
        let slot = startTime;
        console.log("slot ", slot.format());
        console.log("current time ", currentTime.format());
        console.log("end time ", endTime.format());
        console.log("first slot is between start and end time ", currentTime.isAfter(slot));
        while(slot.isBefore(endTime)){
            if(slot.isBefore(currentTime)){
                slot = slot.add(self.service_time, 'm');
                continue;
            }
            if(self.isSlotBooked(slot, bookedSlots, timezone)){
                slot = slot.add(self.service_time, 'm');
                continue;
            }
            let slotTimeFormatted = slot.tz(timezone).format("MM-D-YYYY hh:mm:ss a Z");
            returnSlots.push({
            "time" : slotTimeFormatted, 
            "available" : true, 
            "staffid":self.staff_id, 
            "busid" : self.bus_id});
            slot = slot.add(self.service_time, 'm');
            console.log("slot ", slot);
        }
        //find booked slots

        //compute available slots
        return returnSlots;
    }

    isSlotBooked(slot, bookedSlots, timezone){
       //console.log("++++++++++++++++ ", slot.format());
       //console.log("================ ", slot.toDate().getTime());
       //console.log("================ ");
       let bookedSlot = bookedSlots.find((element) => {
          let bookedTime = moment.tz(element.time, timezone).seconds(0).millisecond(0);
          //console.log("----------------- ", bookedTime.toDate().getTime());
          return bookedTime.toDate().getTime() === slot.toDate().getTime();
       });
       if(bookedSlot){
          //console.log("booked slot@@@@@@@@@@@@@@ returning false ", bookedSlot);
          return true;
       }
       return false;
    }

    findBusinessHours(onDate){
        let self = this;
        let retBusinessHours = self.bus_hours.find((elem) => {
            if(elem.day == (onDate.day()+1)){
                return true;
            }
            return false;
        });
        retBusinessHours.date = onDate;
        return new BusinessHour(retBusinessHours);
    }

    

}

module.exports = Staff;