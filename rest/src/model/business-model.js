'use strict'
var moment = require('moment-timezone');
class Business{
    
    constructor(src){
        if(src){
            this.map(src);
        }
    }

    map(src){
        let self = this;
        self.bus_name = src.bus_name;
        self.address = src.address;
        self.bus_id = src.bus_id;
        self.staff = [];
        self.holidays = src.holidays;
        self.specialized_in = src.specialized_in;
        self.appointment_instructions = src.appointment_instructions.split(',');
        self.awards = src.awards;
        self.imageurl = src.imageurl;
        self.services = src.services;
        self.bus_time_zone = src.bus_time_zone;
    }

    addStaff(staff) {
        let self = this;
        self.staff.push(staff);
    }

    getNextBusinessDayDefault(){
        let self = this;
        let defaultDate = moment.tz(this.bus_time_zone);
        self.holidays.weekdays.forEach(weekholiday => {
            if(weekholiday === defaultDate.day()){
                return self.getNextBusinessDay(defaultDate);
            }
        });
        // TODO : add logic for other holidays
        
        return defaultDate;
    }

    getNextBusinessDay(from){
        let self = this;
        let nextDay = from.clone();
        nextDay.add(1, 'd');
        self.holidays.weekdays.forEach(weekholiday => {
            if(weekholiday === nextDay.day()){
                nextDay = self.getNextBusinessDay(nextDay);
            }
        });
        return nextDay;
    }

    getAvailableSlots(staffobj, bookedSlots, selecteddate){
        let self = this;
        if(self.isGivenDateHoliday(selecteddate)){
            return [];
        }
        if(!selecteddate){
            selecteddate = self.getNextBusinessDayDefault();
        }
        else{
            let tempDate = new Date(selecteddate);
            selecteddate = moment.tz(tempDate, this.bus_time_zone);
            console.log("selecteddate ", selecteddate);
        }
        while(!staffobj.isStaffWorkingDay(selecteddate)){
            selecteddate = self.getNextBusinessDay(selecteddate);
        }
        return staffobj.getAvailableSlots(selecteddate, bookedSlots, this.bus_time_zone);
    }

    isGivenDateHoliday(date){
        return false;  //TODO
    }
}

module.exports = Business;