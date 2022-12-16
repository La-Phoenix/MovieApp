import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from 'src/app/Model/movie';
import { DataService } from 'src/app/Services/Data/data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashBoardComponent implements OnInit {
  latestMovie: any;
  popularMovies!: Movie;
  nowPlayingMovies!: Movie;
  topRatedMovies!: Movie;
  upcomingMovies!: Movie;
  trendingMovies!: Movie;
  originals!: Movie;
  error!: any;

  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit(): void {
    this.getLatestMovie();
    this.getPopularMovies();
    this.getNowPlayingMovies();
    this.getTopRatedMovies();
    this.getUpcomingMovies();
    this.getTrendingMovies();
    this.getOriginals();
  }

  getLatestMovie(): void {
    this.dataService.getLatestMovie().subscribe({
      next: (data) => {
        this.latestMovie = this.dataService.changeData(data);
        console.log(this.latestMovie);
      },
      error: (err) => {
        this.error = err;
      },
    });
  }

  getPopularMovies(): void {
    this.dataService.getPopularMovies().subscribe({
      next: (data) => {
        this.popularMovies = this.dataService.modifyData(data);
      },
      error: (err) => {
        this.error = err;
      },
    });
  }

  getNowPlayingMovies(): void {
    this.dataService.getNowPlayingMovies().subscribe({
      next: (data) => {
        this.nowPlayingMovies = this.dataService.modifyData(data);
      },
      error: (err) => {
        this.error = err;
      },
    });
  }
  getTopRatedMovies(): void {
    this.dataService.getTopRated().subscribe({
      next: (data) => {
        this.topRatedMovies = this.dataService.modifyData(data);
      },
      error: (err) => {
        this.error = err;
      },
    });
  }
  getUpcomingMovies(): void {
    this.dataService.getUpcoming().subscribe({
      next: (data) => {
        this.upcomingMovies = this.dataService.modifyData(data);
      },
      error: (err) => {
        this.error = err;
      },
    });
  }
  getTrendingMovies(): void {
    this.dataService.getTrendingMovies().subscribe({
      next: (data) => {
        this.trendingMovies = this.dataService.modifyData(data);
      },
      error: (err) => {
        this.error = err;
      },
    });
  }
  getOriginals(): void {
    this.dataService.getOriginals().subscribe({
      next: (data) => {
        this.originals = this.dataService.modifyData(data);
      },
      error: (err) => {
        this.error = err;
      },
    });
  }

  onMovieClick(movie: any): void {
    console.log(movie);
    this.router.navigateByUrl('movie/' + movie.id);
  }
}
