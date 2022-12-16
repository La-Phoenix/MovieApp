import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie, ResultsEntity } from 'src/app/Model/movie';
import { environment } from 'src/environments/environment';

const url: string = 'https://api.themoviedb.org/3/';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

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

  getPopularMovies(): Observable<any> {
    return this.http.get<any>(
      url + 'movie/popular?api_key=' + environment.api_key
    );
  }
  getNowPlayingMovies(): Observable<any> {
    return this.http.get<any>(
      url + 'movie/now_playing?api_key=' + environment.api_key
    );
  }
  getTopRated(): Observable<any> {
    return this.http.get<any>(
      url + 'movie/top_rated?api_key=' + environment.api_key
    );
  }
  getUpcoming(): Observable<any> {
    return this.http.get<any>(
      url + 'movie/upcoming?api_key=' + environment.api_key
    );
  }
  getTrendingMovies(): Observable<any> {
    return this.http.get<any>(
      url + 'trending/all/week?api_key=' + environment.api_key
    );
  }
  getOriginals(): Observable<any> {
    return this.http.get<any>(
      url + 'discover/tv?api_key=' + environment.api_key
    );
  }
  // search/movie?api_key=<<api_key>>&language=en-US&page=1&include_adult=false

  searchMovie(search: string): Observable<any> {
    return this.http.get(
      `${url}search/movie?query=${search}&api_key=${environment.api_key}&language=en-US&page=1&include_adult=false`
    );
  }
}
