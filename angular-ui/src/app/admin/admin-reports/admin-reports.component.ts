// angular imports
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// rxjs imports
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';

// service imports
import { FacadeService } from '../../service/facade.service';

// model imports
import { Business } from '../../model/business.model';
import { Staff } from '../../model/staff.model';
import { Expense } from '../../model/expense.model';
import { Appointment } from '../../model/appointment.model';
import { Subject } from 'rxjs';
import { MonthNames } from '../../model/all.month.model';
import { Month } from '../../model/month.model';

import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-admin-reports',
  templateUrl: './admin-reports.component.html',
  styleUrls: ['./admin-reports.component.css']
})
export class AdminReportsComponent implements OnInit {

  /**
   * Date Picker: Year, month, day : https://github.com/kekeh/ngx-mydatepicker#options-attribute
   * https://www.npmjs.com/package/ngx-mydatepicker
   * 
   * https://valor-software.com/ng2-charts/
   * 
   * 
   */

   public businessId:string = "b-test-01";
   public month:string = "";
   public year:string = "";
   public currentMonth:string = "";
   public currentYear:string = "";
   public monthName:string = "";
   public isyearly:boolean = false;

   public business : Business;
   public businessExpense : Array<Expense>;
   public appointmentList : Array<Appointment>;
   public staffList : Array<Staff> ;
   public businessLoaded;
   
   public earningsExpenseErrorFlag : boolean = false;
   public earningsExpenseErrorMessage : string = ""; 
   public earningsExpenseDataLoaded = false;
   public businessDataLoaded = false;
  
   public servicesOptedDataLoaded : boolean = false;
   
   public servicesStaffCallErrorFlag : boolean = false;
   public servicesStaffCallErrorMessage : string = ""; 

   public staffBusinessDataLoaded : boolean = false;

   public servicesEarningsDataLoaded : boolean = false;
   public servicesEarningsErrorMessage : string = ""; 
   public servicesEarningsErrorFlag = false;

   public monthNames : Array<Month> = MonthNames.allMonth;

   public businessDataLoadedSubject = new Subject();

   public chartColors:Array<any> = [
      { 
        backgroundColor: 'rgba(12,12,15,1)',
        borderColor: '#fff',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)'
      }
    ];

  constructor(private route: ActivatedRoute,
    private router: Router,
    private facadeService : FacadeService) { 
      var currentDate = new Date();
      this.month = "" + currentDate.getMonth();
      this.currentMonth = this.month;
      this.year = "" + currentDate.getFullYear();
      this.currentYear = this.year;
      this.monthName =  this.monthNames[this.month].getFullName(); 
    }

  reportPeriodEvent(event) {
    this.isyearly = event.target.checked;
    this.monthName = this.year;
    if (this.isyearly) {
      this.initializeChartData(); 
    } else {
      // back to monthly view
      this.reportMonthChangeEvent(null);
    }
    
  }

  reportMonthChangeEvent(event) {
    if (event) {
      this.month = event.target.value;
    }
    this.monthName =  this.monthNames[this.month].getFullName(); 
    this.initializeChartData();
    // this._chart.refresh(); 
  }

  ngOnInit() {
   this.initializeChartData(); 
  }

  public initializeChartData(): void {
    console.log("yearly val:", this.isyearly);
    Observable.forkJoin(
      this.facadeService.getBusiness(this.businessId),
      this.facadeService.getBusinessExpenses(this.businessId, this.month, this.year, this.isyearly)
    ).subscribe(response => {
        this.business = <any>response[0];
        this.businessExpense = <any>response[1];
        console.log("in call:", this.businessExpense);
        this.businessDataLoaded = true; 
        this.businessDataLoadedSubject.next('loaded');
        // finish
     },
      (error : string) => {
        this.earningsExpenseErrorFlag = true;
        this.earningsExpenseErrorMessage = "Yikes!!! We apologize, currently there isn't any data to generate report.";
        throw error;
      }
    );

    // Services opted:
    this.facadeService.getBusinessBookedAppointments(this.businessId, this.month, this.year, this.isyearly)
      .subscribe(response => {
        this.appointmentList = response;
        this.loadServicesOptedChart();
      
        if (this.businessDataLoaded) {
          this.loadChartsByBusinessAppointments();
        } else {
          this.businessDataLoadedSubject.asObservable().subscribe(x => {
            this.loadChartsByBusinessAppointments();
          });
        }
     },
      (error : string) => {
        this.servicesStaffCallErrorFlag = true;
        this.servicesStaffCallErrorMessage = "Yikes!!! We apologize, currently there isn't any data to generate report.";
        throw error;
      }
    );
  } // END initializeChartData 

  public loadChartsByBusinessAppointments() : void {
    this.loadStaffBusinessChart();
    this.loadEarningsExpenseChart();
    this.loadEarningsServiceChart();
  
  }

  model: any = { jsdate: new Date() };

  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartType:string = 'horizontalBar';
  public barChartLegend:boolean = true;

  public barChartLabels:string[];
  public barChartData:any[];

  public loadEarningsExpenseChart() : void {
    this.barChartLabels = [];
    this.barChartData = [];

    this.staffList = this.business.staff;
    console.log("staffList:", this.staffList);

    let businServices = this.business.services;

    let earningsData = [];
    let expenseData = [];

    /**
     * For each staff,
     *  get the list of appointments by service and staff
     *     calculate the cost of them.. that is earnings for the staff
     */
    this.staffList.forEach( (staff : Staff) => {
      this.barChartLabels.push(staff.staff_name);
      let staffEarnings = 0;
      businServices.forEach( service => {
        let appointmentsByStaffNService = this.appointmentList.filter(a => a.service == service.name
                                         && a.staffId == staff.staff_id);
        staffEarnings += (appointmentsByStaffNService.length * parseInt(service.cost));
      }, this);
      earningsData.push( staffEarnings ); 
      let staffExpense = this.businessExpense.filter(x => x.bus_id == this.business.bus_id 
                                && staff.staff_id == x.staffId);
      if (staffExpense.length > 0) {
        expenseData.push(staffExpense[0].cost); 
      } else {
        expenseData.push(0);
      }
    });

    this.barChartLabels.push("Miscellaneous");
    earningsData.push(0);
    let miscelaneousExpenseList = this.businessExpense.filter(x => x.bus_id == this.business.bus_id && !x.staffId );
    let miscelaneousCost = 0;
    
    miscelaneousExpenseList.forEach(x => {
      if (x.cost) {
        miscelaneousCost += parseInt(x.cost);
      }
    });

    expenseData.push(miscelaneousCost);

    this.barChartData = [
      {data: earningsData, label: 'Earnings'},
      {data: expenseData, label: 'Expense'}
    ];
    this.earningsExpenseDataLoaded = true;
  } // END loadEarningsExpenseChart

  public doughnutChartLabels:string[] = [];
  public doughnutChartData:number[] = [];
  public doughnutChartType:string = 'doughnut';

  public loadServicesOptedChart() : void {
    
    this.doughnutChartData = [];
    this.doughnutChartLabels = [];
    
    if (!this.appointmentList || this.appointmentList.length == 0) {
      this.doughnutChartLabels = ['No Service'];
      this.doughnutChartData = [1];
      this.servicesOptedDataLoaded = true;
      return;
    } 

    let serviceList = new Set(this.appointmentList.map(x => x.service));
    //doughnut chart - service offerd
    this.doughnutChartLabels = Array.from(serviceList.values());
    serviceList.forEach( service => {
      this.doughnutChartData.push(this.appointmentList.filter(x => x.service == service).length);
    });
    this.servicesOptedDataLoaded = true;
  } // END loadServicesOptedChart

  //pie chart - staff busines
  public pieChartLabels:string[] = [];
  public pieChartData:number[] = [];
  public pieChartType:string = 'pie';
  
  public loadStaffBusinessChart() : void {

    this.pieChartLabels = [];
    this.pieChartData = [];
  
    if (!this.appointmentList || this.appointmentList.length == 0) {
      this.pieChartLabels = ['None'];
      this.pieChartData = [1];
      this.staffBusinessDataLoaded = true;
      return;
    } 

    let staffIdList = new Set(this.appointmentList.map(x => x.staffId));

    this.pieChartData = [];
    staffIdList.forEach( staffId => {
      this.pieChartLabels.push(this.business.staff.filter(a => a.staff_id == staffId)[0].staff_name);
      this.pieChartData.push(this.appointmentList.filter(x => x.staffId == staffId).length);
    });
 
    this.staffBusinessDataLoaded = true;
  } // loadStaffBusinessChart

  // service names
  public stackedChartLabels:Array<any> = []; 
  // data with respect to staff
  public stackedChartData:Array<any> = []
  public stackedChartType:string = 'bar';
  public stackedChartOptions = {
    responsive: true,
    scales: {
        xAxes: [{
            stacked: true,
        }],
        yAxes: [{
            stacked: true
        }]
    }
  };  
  
  public loadEarningsServiceChart() : void {
    this.stackedChartData = [];
    console.log("business:", this.business);
    let businServices = this.business.services;
    // let businServices = [{name: "Dental Cleaning", cost: "300"}, {name: "Root Canal Treatment", cost: "100"}, 
    //                        {name: "Cavities", cost: "250"}, {name: "Teeth Pain", cost: "100"}];
    let serviceList = new Set(businServices.map(y => y.name ));
    // service offerd
    this.stackedChartLabels =  Array.from(serviceList.values());
    
    let staffList =  this.business.staff;
    staffList.forEach( staff => {
      var stackData = {};
      stackData["label"] = staff.staff_name;
      stackData["data"] = [];
      businServices.forEach( service => {
        let appointmentsByStaffNService = this.appointmentList.filter(a => a.service == service.name
                                         && a.staffId == staff.staff_id);
        let cost = 0;
        if (service.cost) {
          cost = parseInt(service.cost);
        }
        stackData["data"].push( appointmentsByStaffNService.length * cost); 
      }, this); 
      this.stackedChartData.push(stackData);
    });
    this.servicesEarningsDataLoaded = true;
  } // END loadEarningsServiceChart

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

  public lineChartOptions:any = {
    responsive: true
  };
}
