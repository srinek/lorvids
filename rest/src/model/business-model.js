'use strict'
var moment = require('moment-timezone');
var Staff = require('./staff-model');
class Business{
    
    constructor(src){
        if(src){
            this.map(src);
        }
    }

    map(src){
        let self = this;
        self.staff = [];
        self.loadStaff(src);
        self.bus_name = src.bus_name;
        self.address = src.address;
        self.bus_id = src.bus_id;
        //self.staffIds = src.staff;
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

    loadStaff(src){
        let self = this;
        if(src.staff){
            src.staff.forEach( (eachStaff) => {
                let tempStaff = new Staff(eachStaff);
                if(!tempStaff.bus_hours || tempStaff.bus_hours.length === 0){
                    tempStaff.bus_hours = src.bus_hours;
                }
                self.staff.push(tempStaff);
            });
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
    /* this doesn't work for holidays*/
    getStartTimeOfDay(__day){
        let self = this;
        let retBusinessHours = self.getCurrentDay(__day);
        let startTime = moment(__day);
        startTime.hour(retBusinessHours.startTime.split(":")[0])
        .minute(retBusinessHours.startTime.split(":")[1])
        .seconds(0)
        .millisecond(0);
        return startTime;
    }
    opensAt(){
        let self = this;
        let today = moment.tz(new Date(), this.bus_time_zone);
        if(self.isGivenDateHoliday(today)){
            return "Closed";
        }
        let startTime = self.getStartTimeOfDay(today);
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
            if(elem.day === (today.day()+1)){
                return true;
            }
            return false;
        });
        /* if(!retBusinessHours){
            retBusinessHours = self.bus_hours.find((elem) => {
                if(elem.day == "-1"){
                    return true;
                }
                return false;
            });
        } */
        return retBusinessHours;
    }
    getAllHours(){
        let self = this;
        return {};
    }

    getStaff(staff_id){
        let self = this;
        return self.staff.find((eachStaff) => {
            return eachStaff.staff_id === staff_id;
        });
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
        /* self.holidays.weekdays.forEach(weekholiday => {
            if(weekholiday === defaultDate.day()){
                return self.getNextBusinessDay(defaultDate);
            }
        }); */
        if(self.isGivenDateHoliday(defaultDate)){
            return self.getNextBusinessDay(defaultDate);
        }
        if(!self.isOpenNow() && !defaultDate.isBefore(self.getStartTimeOfDay(defaultDate))){
            return self.getNextBusinessDay(defaultDate);
        }
        // TODO : add logic for other holidays
        
        return defaultDate;
    }

    getNextBusinessDay(from){
        let self = this;
        let nextDay = from.clone();
        nextDay.add(1, 'd');
        if(self.isGivenDateHoliday(nextDay)){
            nextDay = self.getNextBusinessDay(nextDay);
        }
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
            if(weekholiday === (selectedDate.day()+1)){
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