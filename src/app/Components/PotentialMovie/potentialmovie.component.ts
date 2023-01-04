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
  isLoading = true;
  page: number | undefined;
  search: '' | undefined;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(({ query, page }) => {
      // console.log(query);
      this.search = query;
      this.page = page;
      if (!page) {
        this.page = 1;
      }
      this.searchMovie(query);
    });
  }

  searchMovie(search: string): void {
    this.dataService.searchMovie(search, this.page).subscribe({
      next: (data) => {
        // console.log(data);
        this.potentialMovies = this.dataService.modifyData(data).results;
        // console.log(this.potentialMovies);
        this.isLoading = false;
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

  nextPage(page: number, next?: boolean, previous?: boolean): void {
    if (next || previous) {
      this.isLoading = true;
      this.dataService.nextPage(
        page,
        this.page!,
        `movie/search?query=${this.search}`,
        next,
        previous,
        true
      );
    }
    if (page.toString() !== this.page?.toString()) {
      this.isLoading = true;
      this.dataService.nextPage(
        page,
        this.page!,
        `movie/search?query=${this.search}`,
        next,
        previous,
        true
      );
    }
  }
}
