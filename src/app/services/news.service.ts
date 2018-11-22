import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient) { }

  getSources(): Observable<any> {
    return this.http.get(`https://newsapi.org/v2/sources?apiKey=${environment.apiKey}`)
  }

  getNews(source: string): Observable<any> {
    return this.http.get(`https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${environment.apiKey}`);
  }

}
