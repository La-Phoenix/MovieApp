import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResultsEntity } from 'src/app/Model/movie';
import { DataService } from 'src/app/Services/Data/data.service';

@Component({
  selector: 'app-popular',
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.scss'],
})
export class PopularComponent implements OnInit {
  isLoading: boolean = true;
  page: number | undefined;
  popularMovies!: ResultsEntity[];

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
        this.getPopularMovies();
      },
      error: (err) => console.log(err),
    });
  }

  getPopularMovies(): void {
    this.dataService.getPopularMovies(this.page).subscribe({
      next: (data) => {
        this.popularMovies = this.dataService.modifyData(data).results;
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
      this.dataService.nextPage(page, this.page!, 'popular', next, previous);
    }
    if (page.toString() !== this.page?.toString()) {
      this.isLoading = true;
      this.dataService.nextPage(page, this.page!, 'popular', next, previous);
    }
  }
}
