import { Component } from '@angular/core';
import { DataService } from './data.service';
// import { forOwn } from 'lodash/forOwn';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Movie Poster Search';
  movie: Object;
  movieSearch: Object;
  searchTermEntered: string;
  foundMovie: Object;

  constructor(private data: DataService) { }

  ngOnInit() {
    // Get Battle Angel as an example
    this.data.getMovie('tt0437086').subscribe(data => {
      this.movie = data;
      console.log('this.movie is', this.movie);
    });
  }

  onMovieSearch(searchTerm: string) {
    this.data.getMovieBySearch(searchTerm).subscribe((data: any) => {
      if (!data.Search) {
        this.foundMovie = {
          Title: 'Movie Not Found',
          imdbID: '',
          Poster: 'http://fpoimg.com/300x100?text=Movie-Not-Found'
        }
      } else {
        this.foundMovie = data.Search[0];
      }
      console.log('found movie is', this.foundMovie);
    });
  }

  onSearchEntered(event: any) {
    this.searchTermEntered = event.target.value;
    this.onMovieSearch(this.searchTermEntered);
  }

}
