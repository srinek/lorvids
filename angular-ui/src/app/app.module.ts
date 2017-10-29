import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app.routing.module';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SearchBoxComponent } from './search-box/search-box.component';
import { SearchResultsComponent } from './search-results-container/search-results/search-results.component';
import { RecentlyVisitedComponent } from './home-page/recently-visited/recently-visited.component';
import { TrendingComponent } from './home-page/trending/trending.component';
import { FooterComponent } from './footer/footer.component';
import { PageNotFound404Component } from './page-not-found-404/page-not-found-404.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { SearchResultsContainerComponent } from './search-results-container/search-results-container.component';
import {AppointmentService} from './service/appointment.service';
import {SearchService} from './service/search.service';
import {BusinessService} from './service/business.service';
import {ApptService} from './service/appt.service';
import {StaffService} from './service/staff.service';
import {Logger} from './service/logger.service';
import { BookAppointmentComponent } from './book-appointment/book-appointment.component';
import { AvailableSlotsComponent } from './search-results-container/available-slots/available-slots.component';
import { ConfirmAppointmentComponent } from './confirm-appointment/confirm-appointment.component';

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
    SearchResultsContainerComponent,
    BookAppointmentComponent,
    AvailableSlotsComponent,
    ConfirmAppointmentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule
  ],
  providers: [AppointmentService, SearchService, BusinessService, StaffService, ApptService, Logger],
  bootstrap: [AppComponent]
})
export class AppModule { }
