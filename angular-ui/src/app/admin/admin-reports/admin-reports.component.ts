import { Component, OnInit } from '@angular/core';
import { FacadeService } from '../../service/facade.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Business } from '../../model/business.model';
import { Staff } from '../../model/staff.model';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';

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
   public month:string = "2";
   public year:string = "2018";
   public isyearly:boolean = false;

   public business : Business;
   public business1 : Business;
   public staffList : Array<Staff> ;
   public businessLoaded;
   public earningsExpenseErrorFlag : boolean = false;
   public earningsExpenseErrorMessage : string = ""; 
   public earningsExpenseDataLoaded = false;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private facadeService : FacadeService) { }

  ngOnInit() {
    console.log("searchFor "+this.businessId);
    Observable.forkJoin(
      this.facadeService.getBusiness(this.businessId, true),
      this.facadeService.getBusinessExpenses(this.businessId, this.month, this.year, this.isyearly)
    ).subscribe(response => {
        this.business = <any>response[0];
        this.business1 = <any>response[1];
        // Here the codes you want to execute after retrieving all data
        this.loadEarningsExpenseChart();
     },
      (error : string) => {
        this.earningsExpenseErrorFlag = true;
        this.earningsExpenseErrorMessage = "Yikes!!! We apologize, currently there isn't any data to generate report.";
        throw error;
      }
    );

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

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

  //pie chart - staff busines
  public pieChartLabels:string[] = ['Staff A', 'Staff B', 'Staff C'];
  public pieChartData:number[] = [300, 500, 100];
  public pieChartType:string = 'pie';


  //doughnut chart - service offerd
  public doughnutChartLabels:string[] = ['Crowning', 'Whitening', 'Medical Checkup'];
  public doughnutChartData:number[] = [350, 450, 100];
  public doughnutChartType:string = 'doughnut';



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
