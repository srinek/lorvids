import { Component, 
  OnInit,
  ViewChild,
  TemplateRef, 
  Output,
  EventEmitter} from '@angular/core';

  import {
    startOfDay,
    endOfDay,
    subDays,
    addDays,
    endOfMonth,
    isSameDay,
    isSameMonth,
    addHours
  } from 'date-fns';

  import { Subject } from 'rxjs/Subject';

  import {
    CalendarEvent,
    CalendarEventAction,
    CalendarEventTimesChangedEvent
  } from 'angular-calendar';
import { EventInfo } from '../shared/EventInfo';
import { EventService } from '../shared/event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FacadeService } from '../../service/facade.service';
import { Business } from '../../model/business.model';
import { Expense } from '../../model/expense.model';
import { Appointment } from '../../model/appointment.model';
import { Staff } from '../../model/staff.model';
import { Observable } from 'rxjs/Observable';


const colors: any = {
  red: {
    primary: '#ad2121', // border
    secondary: '#FAE3E3' // background-color
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};


@Component({
  selector: 'app-appointment-calendar',
  templateUrl: './appointment-calendar.component.html',
  styleUrls: ['./appointment-calendar.component.css']
})
export class AppointmentCalendarComponent implements OnInit {

  view: string = 'day';
  viewDate: Date = new Date();
  dayStart:number = 9;
  dayEnd:number = 18;

  public businessId:string = "b-test-01";
  public month:string = "";
  public year:string = "";
  public currentMonth:string = "";
  public currentYear:string = "";

  public business : Business;
  public businessExpense : Array<Expense>;
  public appointmentList : Array<Appointment>;
  public staffList : Array<Staff> ;

  public businessDataLoaded = false;
  public businessErrorFlag : boolean = false;
  public businessErrorMessage : string = ""; 

  @Output() eventClicked = new EventEmitter();

  ngOnInit() {
    Observable.forkJoin(
      this.facadeService.getBusiness(this.businessId)
    ).subscribe(response => {
        this.business = <any>response[0];
        this.businessDataLoaded = true; 
        console.log("business:", this.business);
        console.log("sub days:", subDays(endOfMonth(new Date()), 3));
     },
      (error : string) => {
        this.businessErrorFlag = true;
        this.businessErrorMessage = "Yikes!!! We apologize, currently there isn't any data to generate report.";
        throw error;
      }
    );
  }

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event);
      }
    }
  ];

  events: CalendarEvent<EventInfo>[] = [
    {
      start: subDays(startOfDay(new Date()), 1),
      end: addDays(new Date(), 1),
      title: 'Crowning appointment with Dr. Staff',
      color: colors.red,
      meta: {start: new Date(), end: new Date, staff: 'Staff 1', staffId: 123, customerId:456, customerName:'Martin', customerNumber:'3444444', customerEmail:'ab@er.vom',notes:'yennamo'}
    },
    {
      start: startOfDay(new Date()),
      title: 'Whitening appointment with Dr. Staff',
      color: colors.yellow,
    },
    {
      start: subDays(endOfMonth(new Date()), 3),
      end: addDays(endOfMonth(new Date()), 3),
      title: 'A long event that spans 2 months',
      color: colors.blue
    },
    {
      start: addHours(startOfDay(new Date()), 2),
      end: new Date(),
      title: 'Teeth cleaning appointment with Dr. Staff',
      color: colors.yellow,
      actions: this.actions,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true
    }
  ];

  constructor(private route: ActivatedRoute,
    private router: Router,
    private facadeService : FacadeService,
    private eventService:EventService) { 
      var currentDate = new Date();
      this.month = "" + currentDate.getMonth();
      this.currentMonth = this.month;
      this.year = "" + currentDate.getFullYear();
      this.currentYear = this.year;
    }

  modalData: {
    action: string;
    event: CalendarEvent;
  };
  @ViewChild('modalContent') modalContent: TemplateRef<any>;
  

  handleEvent(action: string, event: CalendarEvent): void {

    this.eventClicked.emit();
    this.eventService.eventUpdated.emit(event.meta);

    // console.log("handle event:",this.modalContent);

    // this.modalData = { event, action };
    // this.modal.open(this.modalContent, { size: 'lg' });

  }
}
