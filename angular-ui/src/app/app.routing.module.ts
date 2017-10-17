import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageNotFound404Component } from './page-not-found-404/page-not-found-404.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { SearchResultsContainerComponent } from './search-results-container/search-results-container.component';
import {BookAppointmentComponent} from './book-appointment/book-appointment.component';

const appRoutes : Routes = [
    {path:'', component : HomePageComponent, pathMatch: 'full'},
    {path:'search', component : SearchResultsContainerComponent},
    {path:'search/:searchFor', component : SearchResultsContainerComponent},
    {path:'reviewbooking/:staffId/:bookingId', component : BookAppointmentComponent}/* ,
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
