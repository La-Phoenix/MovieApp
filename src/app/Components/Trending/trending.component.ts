import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResultsEntity } from 'src/app/Model/movie';
import { DataService } from 'src/app/Services/Data/data.service';

@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.scss'],
})
export class TrendingComponent implements OnInit {
  trending!: ResultsEntity[];
  page: number | undefined;
  isLoading = true;

  constructor(
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe({
      next: (params) => {
        this.page = params['page'];
        if (!this.page) {
          this.page = 1;
        }
        this.getTrending();
      },
      error: (err) => console.log(err),
    });
  }

  getTrending(): void {
    this.dataService.getTrendingMovies(this.page).subscribe({
      next: (data) => {
        this.trending = this.dataService.modifyData(data).results;
        this.isLoading = false;
      },
      error: (error) => console.log(error),
    });
  }

  onMovieClick(movie: ResultsEntity) {
    this.router.navigateByUrl('movie/' + movie.id);
  }

  nextPage(page: number, next?: boolean, previous?: boolean): void {
    if (next || previous) {
      this.isLoading = true;
      this.dataService.nextPage(page, this.page!, 'trending', next, previous);
    }
    if (page.toString() !== this.page?.toString()) {
      this.isLoading = true;
      this.dataService.nextPage(page, this.page!, 'trending', next, previous);
    }
  }
}
