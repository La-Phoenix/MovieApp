import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResultsEntity } from 'src/app/Model/movie';
import { DataService } from 'src/app/Services/Data/data.service';

@Component({
  selector: 'app-potentialmovies',
  templateUrl: './potentialmovie.component.html',
  styleUrls: ['./potentialmovie.component.scss'],
})
export class PotentialMovies implements OnInit {
  potentialMovies!: ResultsEntity[];

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(({ query }) => {
      console.log(query);
      this.searchMovie(query);
    });
  }

  searchMovie(search: string): void {
    this.dataService.searchMovie(search).subscribe({
      next: (data) => {
        console.log(data);
        this.potentialMovies = this.dataService.modifyData(data).results;
        console.log(this.potentialMovies);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  onMovieClick(movie: any): void {
    console.log(movie);
    this.router.navigateByUrl('movie/' + movie.id);
  }
}
