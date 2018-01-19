import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
  }

  model: any = { jsdate: new Date() };

  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels:string[] = ['Staff A', 'Staff B', 'Staff C'];
  public barChartType:string = 'horizontalBar';
  public barChartLegend:boolean = true;

  public barChartData:any[] = [
    {data: [265, 259, 280], label: 'Earnings'},
    {data: [28, 48, 40], label: 'Expense'}
  ];

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


    // // lineChart
    // public lineChartData:Array<any> = [
    //   {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    //   {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'},
    //   {data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C'}
    // ];
    // public lineChartLabels:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    // public lineChartOptions:any = {
    //   responsive: true
    // };
    // public lineChartColors:Array<any> = [
    //   { // grey
    //     backgroundColor: 'rgba(148,159,177,0.2)',
    //     borderColor: 'rgba(148,159,177,1)',
    //     pointBackgroundColor: 'rgba(148,159,177,1)',
    //     pointBorderColor: '#fff',
    //     pointHoverBackgroundColor: '#fff',
    //     pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    //   },
    //   { // dark grey
    //     backgroundColor: 'rgba(77,83,96,0.2)',
    //     borderColor: 'rgba(77,83,96,1)',
    //     pointBackgroundColor: 'rgba(77,83,96,1)',
    //     pointBorderColor: '#fff',
    //     pointHoverBackgroundColor: '#fff',
    //     pointHoverBorderColor: 'rgba(77,83,96,1)'
    //   },
    //   { // grey
    //     backgroundColor: 'rgba(148,159,177,0.2)',
    //     borderColor: 'rgba(148,159,177,1)',
    //     pointBackgroundColor: 'rgba(148,159,177,1)',
    //     pointBorderColor: '#fff',
    //     pointHoverBackgroundColor: '#fff',
    //     pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    //   }
    // ];
    // public lineChartLegend:boolean = true;
    // public lineChartType:string = 'line';
  
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
