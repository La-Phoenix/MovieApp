import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResultsEntity } from 'src/app/Model/movie';
import { DataService } from 'src/app/Services/Data/data.service';

@Component({
  selector: 'app-nowPlaying',
  templateUrl: './nowPlaying.component.html',
  styleUrls: ['./nowPlaying.component.scss'],
})
export class NowPlayingComponent implements OnInit {
  nowPlaying!: ResultsEntity[];
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
        this.getNowPlaying();
      },
      error: (err) => console.log(err),
    });
  }

  getNowPlaying(): void {
    this.dataService.getNowPlayingMovies().subscribe({
      next: (data) => {
        this.nowPlaying = this.dataService.modifyData(data).results;
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
      this.dataService.nextPage(page, this.page!, 'nowPlaying', next, previous);
    }
    if (page.toString() !== this.page?.toString()) {
      this.isLoading = true;
      this.dataService.nextPage(page, this.page!, 'nowPlaying', next, previous);
    }
  }
}
