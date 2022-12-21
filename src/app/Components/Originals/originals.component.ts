import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResultsEntity } from 'src/app/Model/movie';
import { DataService } from 'src/app/Services/Data/data.service';

@Component({
  selector: 'app-originals',
  templateUrl: './originals.component.html',
  styleUrls: ['./originals.component.scss'],
})
export class OriginalsComponent implements OnInit {
  originals!: ResultsEntity[];
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

        this.getOriginalMovies();
      },
      error: (err) => console.log(err),
    });
  }

  getOriginalMovies(): void {
    this.dataService.getOriginals().subscribe({
      next: (data) => {
        this.originals = this.dataService.modifyData(data).results;
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
      this.dataService.nextPage(page, this.page!, 'originals', next, previous);
    }
    if (page.toString() !== this.page?.toString()) {
      this.isLoading = true;
      this.dataService.nextPage(page, this.page!, 'originals', next, previous);
    }
  }
}
