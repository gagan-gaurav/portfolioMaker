import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  constructor(private http: HttpClient) {};
  public query: string = "";
  public results: any = [[],[]];
  public resultsVisible = false;
  

  processSearch = debounce(this.search, 500);

  search(){
    if(this.query.length > 0) this.resultsVisible = true;
    else this.resultsVisible = false;

    console.log(this.query)
    this.http.get<any>(`${environment.baseUrl}/api/v1/public/search/${this.query}`)
    .subscribe({
      next: response => {
        console.log("res", response);
        this.results = response;
      },
      error: error => {
        console.error('API Error:', error);
        // Handle the error response
      }
    });
  }
  
  close(){
    this.query = "";
    this.resultsVisible = false;
  }

  
}


type Func = (...args: any[]) => void;

const debounce = (func: Func, delay: number) => {
  let timer: any;

  return function (this: any, ...args: any[]) {
    const context = this;

    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      timer = null;
      func.apply(context, args);
    }, delay);
  };
};