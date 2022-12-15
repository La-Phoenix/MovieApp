import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ResultsEntity } from 'src/app/Model/movie';
import { DataService } from 'src/app/Services/Data/data.service';

@Component({
  selector: 'app-movie-item',
  templateUrl: './movieitem.component.html',
  styleUrls: ['./movieitem.component.scss'],
})
export class MovieItemComponent implements OnInit {
  param!: string;
  movie!: ResultsEntity;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe({
      next: (params: Params) => {
        console.log(params['id']);
        this.param = params['id'];
        this.getMovie();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getMovie(): void {
    this.dataService.getMovie(this.param).subscribe({
      next: (data) => {
        this.movie = this.dataService.changeData(data);
        console.log(this.movie);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
