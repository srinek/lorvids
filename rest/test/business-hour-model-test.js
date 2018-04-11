let BusinessHour = require('../src/model/business-hour-model');

let busHour = new BusinessHour({"day":"2", "startTime":"6:30 PM", "endTime":"5:00 PM"});

console.log(busHour.get24HrStartTime());