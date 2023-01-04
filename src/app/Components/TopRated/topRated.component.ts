import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResultsEntity } from 'src/app/Model/movie';
import { DataService } from 'src/app/Services/Data/data.service';

@Component({
  selector: 'app-topRated',
  templateUrl: './topRated.component.html',
  styleUrls: ['./topRated.component.scss'],
})
export class TopRatedComponent implements OnInit {
  topRated!: ResultsEntity[];
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
        this.getTopRated();
      },
      error: (err) => console.log(err),
    });
  }

  getTopRated(): void {
    this.dataService.getTopRated(this.page).subscribe({
      next: (data) => {
        this.topRated = this.dataService.modifyData(data).results;
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
      this.dataService.nextPage(page, this.page!, 'topRated', next, previous);
    }
    if (page.toString() !== this.page?.toString()) {
      this.isLoading = true;
      this.dataService.nextPage(page, this.page!, 'topRated', next, previous);
    }
  }
}
