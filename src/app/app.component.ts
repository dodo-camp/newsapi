import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject, merge, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { NewsService } from './services/news.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  public source: string;
  public sources: Array<any>;
  public news: Array<any>
  public group: FormGroup;
  protected _news$: Subscription;
  protected _sources$: Subscription;
  protected _valueChanges$: Subscription;
  constructor(private newsService: NewsService, private fb: FormBuilder) {
    this.group = fb.group({
      source: new FormControl('')
    });
  }

  ngOnDestroy() {
    if (this._valueChanges$)
      this._valueChanges$.unsubscribe();
    if (this._news$)
      this._news$.unsubscribe();
    if (this._sources$)
      this._sources$.unsubscribe();
  }

  ngOnInit() {
    this._getFormChanges();
    this._getSources();
    this.group.controls['source'].setValue('bbc-news', { emitEvent: true });
  }

  protected _getFormChanges() {
    this._valueChanges$ = this.group.valueChanges.subscribe((data) => {
      this._getNews(data.source);
    })
  }

  protected _getNews(source: any) {
    this._news$ = this.newsService.getNews(source).subscribe(this._setNews.bind(this), err => console.log(err));
  }

  protected _getSources() {
    this._sources$ = this.newsService.getSources().subscribe(this._setSources.bind(this), err => console.log(err));
  }

  protected _setNews(response: any) {
    this.news = response.articles;
  }

  protected _setSources(response: any) {
    this.sources = response.sources
  }

}
