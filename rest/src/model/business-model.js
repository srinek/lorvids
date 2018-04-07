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
        self.staffIds = src.staff;
        self.staff = [];
        self.holidays = src.holidays;
        self.specialized_in = src.specialized_in;
        self.appointment_instructions = src.appointment_instructions;
        self.awards = src.awards;
        self.images = src.images;
        self.defaultImage = src.defaultImage;
        self.services = src.services;
        self.bus_time_zone = src.bus_time_zone;
        self.phone = src.phone;
        self.bus_hours = src.bus_hours;
        self.open = self.isOpenNow();
        self.startTime = self.opensAt();
        self.endTime = self.closesAt();
        self.allhours = self.getAllHours();
        self.category = src.category;
        if(src.website){
            self.website = src.website;
        }
        if(src.email){
            self.email = src.email;
        }
    }

    isOpenNow(){
        let self = this;
        let today = moment.tz(new Date(), this.bus_time_zone);
        if(self.isGivenDateHoliday(today)){
            return false;
        }
        let retBusinessHours = self.getCurrentDay(today);
        let startTime = moment(today);
        startTime.hour(retBusinessHours.startTime.split(":")[0])
        .minute(retBusinessHours.startTime.split(":")[1])
        .seconds(0)
        .millisecond(0);
        let endTime = moment(today);
        endTime.hour(retBusinessHours.endTime.split(":")[0])
        .minute(retBusinessHours.endTime.split(":")[1])
        .seconds(0)
        .millisecond(0);
        if(today.isBetween(startTime, endTime)){
            return true;
        }
        return false;
    }
    opensAt(){
        let self = this;
        let today = moment.tz(new Date(), this.bus_time_zone);
        if(self.isGivenDateHoliday(today)){
            return "Closed";
        }
        let retBusinessHours = self.getCurrentDay(today);
        let startTime = moment(today);
        startTime.hour(retBusinessHours.startTime.split(":")[0])
        .minute(retBusinessHours.startTime.split(":")[1])
        .seconds(0)
        .millisecond(0);
        return startTime.format("MM-D-YYYY hh:mm:ss a");
    }
    closesAt(){
        let self = this;
        let today = moment.tz(new Date(), this.bus_time_zone);
        if(self.isGivenDateHoliday(today)){
            return "Closed";
        }
        let retBusinessHours = self.getCurrentDay(today);
        let endTime = moment(today);
        endTime.hour(retBusinessHours.endTime.split(":")[0])
        .minute(retBusinessHours.endTime.split(":")[1])
        .seconds(0)
        .millisecond(0);
        return endTime.format("MM-D-YYYY hh:mm:ss a");
    }
    getCurrentDay(today){
        let self = this;
        let retBusinessHours = self.bus_hours.find((elem) => {
            if(elem.day == today.day()){
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
    getAllHours(){
        let self = this;
        return {};
    }
    addStaff(staff) {
        let self = this;
        self.staff.push(staff);
    }

    addAllStaff(staffObjs) {
        let self = this;
        self.staff = staffObjs;
    }
    
    getNextBusinessDayDefault(){
        let self = this;
        let defaultDate = moment.tz(this.bus_time_zone);
        self.holidays.weekdays.forEach(weekholiday => {
            if(weekholiday === defaultDate.day()){
                return self.getNextBusinessDay(defaultDate);
            }
        });
        if(!self.isOpenNow()){
            return self.getNextBusinessDay(defaultDate);
        }
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
        // TODO : add logic for other holidays
        return nextDay;
    }

    getAvailableSlots(staffobj, bookedSlots, selecteddate){
        let self = this;
        if(!selecteddate){  // when date is not selected by user
            selecteddate = self.getNextBusinessDayDefault();
            while(!staffobj.isStaffWorkingDay(selecteddate)){
                selecteddate = self.getNextBusinessDay(selecteddate);
            }
        }
        else{
            let tempDate = new Date(selecteddate);
            selecteddate = moment.tz(tempDate, this.bus_time_zone);
            if(self.isGivenDateHoliday(selecteddate)){
                return [];
            }
        }
        return staffobj.getAvailableSlots(selecteddate, bookedSlots, this.bus_time_zone);
    }

    isGivenDateHoliday(selectedDate){
        let self = this;
        let isHoliday = false;
        self.holidays.weekdays.forEach(weekholiday => {
            if(weekholiday === selectedDate.day()){
                //console.log(" selectedDate %s is holiday", selectedDate);
                isHoliday = true;
            }
        });
        return isHoliday;  //TODO
    }

    toJson(){
        return this;
    }
}

module.exports = Business;