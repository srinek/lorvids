import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app.routing.module';
import { HttpModule } from '@angular/http';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import {SelectModule} from 'ng2-select';
import { CalendarModule } from 'angular-calendar';
import { ChartsModule } from 'ng2-charts'; 
import { ImageUploadModule } from "angular2-image-upload";

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SearchBoxComponent } from './search-box/search-box.component';
import { SearchResultsComponent } from './search-results-container/search-results/search-results.component';
import { SearchFacetsComponent } from './search-results-container/search-facets/search-facets.component';
import { RecentlyVisitedComponent } from './home-page/recently-visited/recently-visited.component';
import { TrendingComponent } from './home-page/trending/trending.component';
import { FooterComponent } from './footer/footer.component';
import { PageNotFound404Component } from './page-not-found-404/page-not-found-404.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import {FacadeService} from './service/facade.service';
import {SearchService} from './service/search.service';
import {BusinessService} from './service/business.service';
import {ApptService} from './service/appt.service';
import {StaffService} from './service/staff.service';
import {Logger} from './service/logger.service';
import { ReviewBookingComponent } from './review-booking/review-booking.component';
import { AvailableSlotsComponent } from './search-results-container/available-slots/available-slots.component';
import { ConfirmBookingComponent } from './confirm-booking/confirm-booking.component';
import { AddBusinessComponent } from './add-business/add-business.component';
import { AddStaffComponent } from './add-staff/add-staff.component';
import { LanguageFacetDropDownDirective } from './search-results-container/search-facets/language-facet-dropdown.directive';
import { SearchFacetComponent } from './search-results-container/search-facets/search-facet/search-facet.component';
import { DatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BusinessPageComponent } from './business-page/business-page.component';
import { StaffSlotsComponent } from './common/staff-slots/staff-slots.component';
import { StaffPageComponent } from './staff-page/staff-page.component';
import { AddServiceComponent } from './add-service/add-service.component';
import { BusinessHoursComponent } from './common/business-hours/business-hours.component';

import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminReportsComponent } from './admin/admin-reports/admin-reports.component';
import { AdminStaffComponent } from './admin/admin-staff/admin-staff.component';
import { AdminSettingsComponent } from './admin/admin-settings/admin-settings.component';
import { AdminStaffCountComponent } from './admin/admin-staff-count/admin-staff-count.component';
import { AdminExpenseTrackerComponent } from './admin/admin-expense-tracker/admin-expense-tracker.component';
import { AdminStaffDetailsComponent } from './admin/admin-staff-details/admin-staff-details.component';
import { AdminDetailComponent } from './admin/admin-detail/admin-detail.component';
import { AppointmentCalendarComponent } from './admin/appointment-calendar/appointment-calendar.component';
import { AdminHeaderComponent } from './admin/admin-header/admin-header.component';
import { S3ImageService } from './service/s3image.service';
import { SearchResultComponent } from './search-results-container/search-results/search-result/search-result.component';
import { UserService } from './service/user.service';
import { ActivateUserComponent } from './activate-user/activate-user.component';
import { ViewAppointmentsComponent } from './view-appointments/view-appointments.component';
import { ListBusinessComponent } from './home-page/list-business/list-business.component';
import { environment } from '../environments/environment';

import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider
} from 'angular4-social-login';
import { BusinessSignupComponent } from './auth/business-signup/business-signup.component';
import { AuthenticationService } from './service/authentication.service';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { ConfirmUserComponent } from './auth/confirm-user/confirm-user.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthenticationInterceptor } from './auth/authentication.interceptor';
import { GoogleAPIService } from './service/google-api.service';

const CONFIG = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider(environment.google_loging_provider_id)
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider(environment.fb_login_provider_id)
  }
]);
export function provideConfig() {
  return CONFIG;
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchBoxComponent,
    SearchResultsComponent,
    RecentlyVisitedComponent,
    TrendingComponent,
    FooterComponent,
    PageNotFound404Component,
    ErrorPageComponent,
    HomePageComponent,
    ReviewBookingComponent,
    AvailableSlotsComponent,
    ConfirmBookingComponent,
    AddBusinessComponent,
    AddStaffComponent,
    SearchFacetsComponent,
    LanguageFacetDropDownDirective,
    SearchFacetComponent,
    BusinessPageComponent,
    StaffSlotsComponent,
    StaffPageComponent,
    AddServiceComponent,
    BusinessHoursComponent,
   // admin components   
    AdminDetailComponent,
    AppointmentCalendarComponent,
    AdminHeaderComponent,
    AdminDashboardComponent,
    AdminReportsComponent,
    AdminStaffComponent,
    AdminSettingsComponent,
    AdminStaffCountComponent,
    AdminExpenseTrackerComponent,
    AdminStaffDetailsComponent,
    SearchResultComponent,
    ActivateUserComponent,
    ViewAppointmentsComponent,
    ListBusinessComponent,
    BusinessSignupComponent,
    SignInComponent,
    ConfirmUserComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,ReactiveFormsModule ,CustomFormsModule ,
    HttpModule,
    CalendarModule.forRoot(),
    DatepickerModule.forRoot(),
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    TimepickerModule.forRoot(),
    CarouselModule.forRoot(),
    SelectModule,
    ChartsModule,
    ImageUploadModule.forRoot(),
    BsDropdownModule.forRoot(),
    SocialLoginModule
  ],
  providers: [
    FacadeService, SearchService, 
    BusinessService, StaffService, 
    ApptService, S3ImageService, GoogleAPIService, 
    Logger, UserService, AuthenticationService,
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor,
      multi: true
    }
  ],
    bootstrap: [AppComponent]
})
export class AppModule { }
