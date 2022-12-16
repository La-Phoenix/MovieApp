import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashBoardComponent } from './Components/DashBoard/dashboard.component';
import { MovieItemComponent } from './Components/MovieItem/movieitem.component';
import { PotentialMovies } from './Components/PotentialMovie/potentialmovie.component';

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
