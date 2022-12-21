import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { DashBoardComponent } from './Components/DashBoard/dashboard.component';
import { MovieItemComponent } from './Components/MovieItem/movieitem.component';
import { NavbarComponent } from './UIElements/Navbar/navbar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PotentialMovies } from './Components/PotentialMovie/potentialmovie.component';
import { PopularComponent } from './Components/Popular/popular.component';
import { NowPlayingComponent } from './Components/NowPlaying/nowPlaying.component';
import { OriginalsComponent } from './Components/Originals/originals.component';
import { TopRatedComponent } from './Components/TopRated/topRated.component';
import { TrendingComponent } from './Components/Trending/trending.component';
import { UpcomingComponent } from './Components/Upcoming/upcoming.component';
import { LoadingComponent } from './UIElements/loading/loading.component';

@NgModule({
  declarations: [
    AppComponent,
    DashBoardComponent,
    MovieItemComponent,
    NavbarComponent,
    PotentialMovies,
    PopularComponent,
    NowPlayingComponent,
    OriginalsComponent,
    TopRatedComponent,
    TrendingComponent,
    UpcomingComponent,
    LoadingComponent
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
