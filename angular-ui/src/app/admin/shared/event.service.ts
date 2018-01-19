import { EventInfo } from "./EventInfo";
import { EventEmitter } from "@angular/core";

export class EventService {
    
    eventInfo:EventInfo;

    eventUpdated = new EventEmitter<EventInfo>();

    setEventInfo(eventInfo:EventInfo) {
        this.eventInfo = eventInfo;
    }

    getEventInfo(){
        return this.eventInfo;
    }


}