'use strict'
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
        var options = {weekday : 'short' , timeZone : self.bus_time_zone,  timeZoneName: 'short' };
        let utcDate = new Date();
        utcDate.setTime(Date.UTC(utcDate.getFullYear(), utcDate.getMonth(), utcDate.getDate()));
        self.holidays.weekdays.forEach(weekholiday => {
            if(weekholiday === utcDate.getDay()){
                return self.getNextBusinessDay(utcDate);
            }
        });
        // add logic for other holidays
        
        return utcDate;
    }

    getNextBusinessDay(from){
        let self = this;
        let nextDay = new Date();
        nextDay.setTime(Date.UTC(from.getFullYear(), from.getMonth(), from.getDay()+1));
        var options = {weekday : 'short' , timeZone : self.bus_time_zone,  timeZoneName: 'short' };
        self.holidays.weekdays.forEach(weekholiday => {
            if(weekholiday === nextDay.getDay()){
                nextDay = self.getNextBusinessDay(nextDay);
            }
        });
        return nextDay;
    }

    getAvailableSlots(staffobj){
        let self = this;
        let nextDay = self.getNextBusinessDayDefault(); 
        while(!staffobj.isStaffWorkingDay(nextDay)){
            nextDay = self.getNextBusinessDay(nextDay);
        }
        return staffobj.getAvailableSlots(nextDay);
    }
}

module.exports = Business;