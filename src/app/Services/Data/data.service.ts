import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Movie, ResultsEntity } from 'src/app/Model/movie';
import { environment } from 'src/environments/environment';

const url: string = 'https://api.themoviedb.org/3/';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  getMovie(id: string): Observable<any> {
    return this.http.get(
      url + `movie/${id}?api_key=${environment.api_key}&language=en-US)`
    );
  }

  changeData(res: any): any {
    if (!res.backdrop_path) {
      res.backdrop_path =
        'https://image.tmdb.org/t/p/original' +
        res.poster_path +
        '?api_key=' +
        environment.api_key;
    } else {
      res.backdrop_path =
        'https://image.tmdb.org/t/p/original' +
        res.backdrop_path +
        '?api_key=' +
        environment.api_key;
    }
    if (res.adult === true) {
      res.backdrop_path = ' https://via.placeholder.com/150';
    }
    return res;
  }

  modifyData(movies: Movie): any {
    // console.log(movies);
    if (movies.results) {
      // console.log(movies.results);
      movies.results.forEach((element: ResultsEntity) => {
        element.backdrop_path =
          'https://image.tmdb.org/t/p/original' +
          element.backdrop_path +
          '?api_key=' +
          environment.api_key;
        if (!element.title) {
          element.title = element?.name;
        }
      });
    }
    return movies;
  }

  getLatestMovie(): Observable<any> {
    return this.http.get<any>(
      url + 'movie/latest?api_key=' + environment.api_key
    );
  }

  getPopularMovies(page?: number): Observable<any> {
    return this.http.get<any>(
      url + 'movie/popular?api_key=' + environment.api_key + '&page=' + page
    );
  }
  getNowPlayingMovies(page?: number): Observable<any> {
    return this.http.get<any>(
      url + 'movie/now_playing?api_key=' + environment.api_key + '&page=' + page
    );
  }
  getTopRated(page?: number): Observable<any> {
    return this.http.get<any>(
      url + 'movie/top_rated?api_key=' + environment.api_key + '&page=' + page
    );
  }
  getUpcoming(page?: number): Observable<any> {
    return this.http.get<any>(
      url + 'movie/upcoming?api_key=' + environment.api_key + '&page=' + page
    );
  }
  getTrendingMovies(page?: number): Observable<any> {
    return this.http.get<any>(
      url + 'trending/all/week?api_key=' + environment.api_key + '&page=' + page
    );
  }
  getOriginals(page?: number): Observable<any> {
    return this.http.get<any>(
      url + 'discover/tv?api_key=' + environment.api_key + '&page=' + page
    );
  }
  // search/movie?api_key=<<api_key>>&language=en-US&page=1&include_adult=false

  searchMovie(search: string): Observable<any> {
    return this.http.get(
      `${url}search/movie?query=${search}&api_key=${environment.api_key}&language=en-US&page=1&include_adult=false`
    );
  }

  nextPage(
    page: number,
    routePage: number,
    pageTitle: string,
    next?: boolean,
    previous?: boolean
  ): void {
    if (next) {
      if (!routePage) {
        routePage = 1;
      }
      routePage++;
      page = routePage;
    }
    if (previous && routePage) {
      routePage--;
      page = routePage;
    }
    if (page > 0) {
      this.router.navigateByUrl('movie/' + pageTitle + '?page=' + page);
    }
    // document
    //   .querySelectorAll('.page-link')
    //   .forEach((el) => (el.className = 'page-link'));
    // if (document.getElementById(page?.toString())) {
    //   document.getElementById(page?.toString())!.className = 'active page-link';
    // }
  }
}
