import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageNotFound404Component } from './page-not-found-404/page-not-found-404.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import {ReviewBookingComponent} from './review-booking/review-booking.component';
import { ConfirmBookingComponent } from './confirm-booking/confirm-booking.component';
import {AddBusinessComponent} from './add-business/add-business.component';
import { AddStaffComponent } from './add-staff/add-staff.component';
import { BusinessPageComponent } from './business-page/business-page.component';
import { StaffPageComponent } from './staff-page/staff-page.component';
import { AddServiceComponent } from './add-service/add-service.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminReportsComponent } from './admin/admin-reports/admin-reports.component';
import { AdminStaffComponent } from './admin/admin-staff/admin-staff.component';
import { AdminStaffDetailsComponent } from './admin/admin-staff-details/admin-staff-details.component';
import { AdminSettingsComponent } from './admin/admin-settings/admin-settings.component';
import { AdminExpenseTrackerComponent } from './admin/admin-expense-tracker/admin-expense-tracker.component';
import { SearchResultsComponent } from './search-results-container/search-results/search-results.component';

const appRoutes : Routes = [
    {path:'', component : HomePageComponent, pathMatch: 'full'},
    {path:'search', component : SearchResultsComponent},
    //{path:'search/:searchFor', component : SearchResultsContainerComponent},
    {path:'reviewbooking/:busId/:staffId/:bookingId', component : ReviewBookingComponent},
    {path:'confirm/:busId/:staffId/:bookingId', component : ConfirmBookingComponent},
    {path:'addb', component : AddBusinessComponent},
    {path:'addsvc/:busId', component : AddServiceComponent},
    {path:'addstaff/:busId', component : AddStaffComponent},
    {path:'bushome/:busId', component : BusinessPageComponent},
    {path:'staff/:staffId', component : StaffPageComponent},
    { path: 'admin/dashboard', component : AdminDashboardComponent},
    { path: 'admin/reports', component : AdminReportsComponent},
    { path: 'admin/staff', component : AdminStaffComponent},
    { path: 'admin/staff-details/:staffid', component : AdminStaffDetailsComponent},
    { path: 'admin/settings', component : AdminSettingsComponent},
    { path: 'admin/expense', component : AdminExpenseTrackerComponent}

    
    
    /* ,
    { path: '**', redirectTo: '/somewhere-else', pathMatch: 'full' } */  // catches all routes that are not defined in the routes.
  ];

@NgModule({
  imports: [
    // RouterModule.forRoot(appRoutes, {useHash: true})
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
