import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashBoardComponent } from './Components/DashBoard/dashboard.component';
import { MovieItemComponent } from './Components/MovieItem/movieitem.component';
import { NowPlayingComponent } from './Components/NowPlaying/nowPlaying.component';
import { OriginalsComponent } from './Components/Originals/originals.component';
import { PopularComponent } from './Components/Popular/popular.component';
import { PotentialMovies } from './Components/PotentialMovie/potentialmovie.component';
import { TopRatedComponent } from './Components/TopRated/topRated.component';
import { TrendingComponent } from './Components/Trending/trending.component';
import { UpcomingComponent } from './Components/Upcoming/upcoming.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashBoardComponent },
  {
    path: 'movie',
    children: [
      {
        path: 'search',
        component: PotentialMovies,
      },
      {
        path: 'popular',
        component: PopularComponent,
      },
      {
        path: 'nowPlaying',
        component: NowPlayingComponent,
      },
      {
        path: 'originals',
        component: OriginalsComponent,
      },
      {
        path: 'topRated',
        component: TopRatedComponent,
      },
      {
        path: 'trending',
        component: TrendingComponent,
      },
      {
        path: 'upcoming',
        component: UpcomingComponent,
      },
      {
        path: ':id',
        component: MovieItemComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
