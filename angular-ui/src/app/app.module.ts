import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app.routing.module';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap/modal/modal.module';
import { CalendarModule } from 'angular-calendar';

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
import { SearchResultsContainerComponent } from './search-results-container/search-results-container.component';
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
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap/dropdown/dropdown-config';
import { NgbDatepicker } from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker';

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
    ReviewBookingComponent,
    AvailableSlotsComponent,
    ConfirmBookingComponent,
    AddBusinessComponent,
    AddStaffComponent,
    SearchFacetsComponent,
    LanguageFacetDropDownDirective,
    SearchFacetComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    NgbModalModule.forRoot(),
    CalendarModule.forRoot(),
    NgbModule.forRoot()
  ],
  providers: [FacadeService, SearchService, 
    BusinessService, StaffService, 
    ApptService, Logger],
  bootstrap: [AppComponent]
})
export class AppModule { }
