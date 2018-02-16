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

@Component({
  selector: 'app-admin-reports',
  templateUrl: './admin-reports.component.html',
  styleUrls: ['./admin-reports.component.css']
})
export class AdminReportsComponent implements OnInit {

  /**
   * Date Picker: Year, month, day : https://github.com/kekeh/ngx-mydatepicker#options-attribute
   * https://www.npmjs.com/package/ngx-mydatepicker
   * profit expense                        hori.  Bar chart
   * 
   * categories/services most opted for a week           Bar chart
   * 
   * Staff usage in a week   -- no. of appointments       Pie chart
   * 
   * Line Charts
   * Sales in relation to awareness
   * 
   * 
   * Quarterly and Monthly Revenue Reports      Pie chart
   * 
   * Capacity and Resource Planning
   * 
   * 
   * 
   */

   public businessId:string = "b-test-01";
   public month:string = "";
   public year:string = "";
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
   public servicesOptedErrorFlag : boolean = false;
   public servicesOptedErrorMessage : string = ""; 
   public servicesOptedDataLoaded = false;
   public monthNames : Array<string> = ["", "January", "February", "March", "April", "May", "June",
   "July", "August", "September", "October", "November", "December" ];

   public businessDataLoadedObservable1:Observable<string> =  Observable.create(observer => {
    console.log("observer type:", typeof observer);
   });

   public businessDataLoadedObservable = new Subject();

   public pieChartOptions = { colors : [ '#803690', '#00ADF9', '#DCDCDC', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'] };

  //  public chartColors:Array<any> = ["#ef9ab2","#7bc6f2","#fce196","#4caf50","#ff5722","#795548","#607d8b","#673ab7","#86d8d8","#9e9e9e",
  //                                      "#e94351","#00bcd4","#fef982","#8e5ea2","#66c855","#fffbdd","#e5e5e5","#f5fdf8","#e8c3b9","#c4574f" 
  //                                     ];
  // public chartColors:Array<any> = [{backgroundColor:"#ef9ab2"},{backgroundColor:"#7bc6f2"},{backgroundColor:"#fce196"}];

  // public chartColors:Array<any>  = ["rgba(159,204,0,1)","rgba(250,109,33,1)","rgba(154,154,154,1)"];
          

  // public chartColors:Array<any> = [
  //   'rgb(255, 99, 132)',
  //   'rgb(255, 159, 64)',
  //   'rgb(255, 205, 86)',
  //   'rgb(75, 192, 192)',
  //   'rgb(54, 162, 235)',
  //   'rgb(153, 102, 255)',
  //   'rgb(201, 203, 207)'
  // ];

  public chartColors:Array<any> = [{ // grey
    backgroundColor: 'rgba(159,204,0)',
    borderColor: '#fff',
    pointBackgroundColor: 'rgb(159,204,0)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgb(148,159,177,0.8)'
  },
  { // dark grey
    backgroundColor: 'rgba(123,198,242,1)',
    borderColor: '#fff',
    pointBackgroundColor: 'rgba(77,83,96,1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(77,83,96,1)'
  },
  { // grey
    backgroundColor: 'rgba(252,225,150,1)',
    borderColor: '#fff',
    pointBackgroundColor: 'rgba(148,159,177,1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  }];

  constructor(private route: ActivatedRoute,
    private router: Router,
    private facadeService : FacadeService) { 
    
      this.month = "2";
      this.year = "2018";
      this.monthName =  this.monthNames[this.month]; 

      // ChartJsProvider.setOptions({
      //   chartColors: ['#FF5252', '#FF8A80'],
      //   responsive: false
      // });
  

    }

  ngOnInit() {
    console.log("searchFor "+this.businessId);
    Observable.forkJoin(
      this.facadeService.getBusiness(this.businessId, true),
      this.facadeService.getBusinessExpenses(this.businessId, this.month, this.year, this.isyearly)
    ).subscribe(response => {
        this.business = <any>response[0];
        this.businessExpense = <any>response[1];
        console.log("in call:", this.businessExpense);
        // Here the codes you want to execute after retrieving all data
        this.loadEarningsExpenseChart();
        // Observable.of(this.businessDataLoadedObservable);
        this.businessDataLoadedObservable.next('loaded');

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
    
      if (this.earningsExpenseDataLoaded) {
        this.loadStaffBusinessChart();
      } else {
        this.businessDataLoadedObservable.asObservable().subscribe(x => {
          this.loadStaffBusinessChart();
        });
      }
   },
    (error : string) => {
      this.servicesOptedErrorFlag = true;
      this.servicesOptedErrorMessage = "Yikes!!! We apologize, currently there isn't any data to generate report.";
      throw error;
    }
  );

console.log("setting up the context");
this.loadStaffBusinessChart();
}

  

  model: any = { jsdate: new Date() };

  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartType:string = 'horizontalBar';
  public barChartLegend:boolean = true;

  public barChartLabels:string[] = [];
  public barChartData:any[] = [];

  public loadEarningsExpenseChart() : void {

    this.staffList = this.business.staff;
    console.log("staffList:", this.staffList);

    this.staffList.forEach( (staff : Staff) => {
      this.barChartLabels.push(staff.staff_name);
    });

    this.barChartLabels.push("Miscellaneous");

    this.barChartData = [
      {data: [265, 259, 280, 0], label: 'Earnings'},
      {data: [28, 48, 40, 50], label: 'Expense'}
    ];

    this.earningsExpenseDataLoaded = true;
  }

  public doughnutChartLabels:string[] = [];
  public doughnutChartData:number[] = [];
  public doughnutChartType:string = 'doughnut';

  public loadServicesOptedChart() : void {
  
    if (!this.appointmentList || this.appointmentList.length == 0) {
      this.doughnutChartLabels = ['No Service'];
      this.doughnutChartData = [1];
      return;
    } 

    let serviceList = new Set(this.appointmentList.map(x => x.service));
    //doughnut chart - service offerd
    this.doughnutChartLabels = Array.from(serviceList.values());
    serviceList.forEach( service => {
      this.doughnutChartData.push(this.appointmentList.filter(x => x.service == service).length);
    });
  }

  //pie chart - staff busines
  public pieChartLabels:string[] = [];
  public pieChartData:number[] = [];
  public pieChartType:string = 'pie';
  
  // Observable.forkJoin([observable1,observable2])
  //      .subscribe((response) => {
  //         console.log(response[0], response[1]);
  //      });
  
  // Promise.all(
  //     [businessDataLoadedPromise, appointmentDataLoadedPromise ]
  //  ).then(() => {
  //   console.log("all resolved")
  // });

  public loadStaffBusinessChart() : void {
  
    // if (!this.appointmentList || this.appointmentList.length == 0) {
    //   this.pieChartLabels = ['None'];
    //   this.pieChartData = [1];
    //   return;
    // } 

    // let staffIdList = new Set(this.appointmentList.map(x => x.staffId));

    // this.pieChartData = [];
    // staffIdList.forEach( staffId => {
    //   this.pieChartLabels.push(this.business.staff.filter(a => a.staff_id == staffId)[0].staff_name);
    //   this.pieChartData.push(this.appointmentList.filter(x => x.staffId == staffId).length);
    // });

    // this.pieChartLabels = ["staff1", "staff2", "staff3"];
    // this.pieChartData = [3, 6, 1];

    this.pieChartLabels = ['Download Sales', 'In-Store Sales', 'Mail Sales'];
    this.pieChartData = [300, 500, 100];

}

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

    // lineChart
    public lineChartData:Array<any> = [
      {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
        {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
    ];

    // public lineChartData:Array<any> = [
    //   [65, 59, 80, 81, 56, 55, 40],
    //   [28, 48, 40, 19, 86, 27, 90]
    // ];

    public lineChartOptions:any = {
        responsive: true
      };
    public lineChartLabels:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    public lineChartType:string = 'line';

}
