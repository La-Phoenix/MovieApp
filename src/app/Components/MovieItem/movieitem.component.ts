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
  isLoading = true;
  video: any | undefined

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
        this.watchMovie()
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  watchMovie(): void{
    this.dataService.watchMovie(this.param).subscribe({
      next: (data) => {
        console.log(data)
        this.video = data
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
  getMovie(): void {
    this.dataService.getMovie(this.param).subscribe({
      next: (data) => {
        this.movie = this.dataService.changeData(data);
        console.log(this.movie);
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
