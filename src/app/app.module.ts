import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { DashBoardComponent } from './Components/DashBoard/dashboard.component';
import { MovieItemComponent } from './Components/MovieItem/movieitem.component';
import { NavbarComponent } from './Components/Navbar/navbar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PotentialMovies } from './Components/PotentialMovie/potentialmovie.component';

@NgModule({
  declarations: [
    AppComponent,
    DashBoardComponent,
    MovieItemComponent,
    NavbarComponent,
    PotentialMovies,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
