import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { DashBoardComponent } from './Components/DashBoard/dashboard.component';
import { MovieItemComponent } from './Components/MovieItem/movieitem.component';
import { NavbarComponent } from './Components/Navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    DashBoardComponent,
    MovieItemComponent,
    NavbarComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
