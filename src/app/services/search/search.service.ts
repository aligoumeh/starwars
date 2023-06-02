import { Injectable } from '@angular/core';
import { Observable, Subject, debounceTime, distinctUntilChanged, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private _searchTerm = new Subject<string>();
  searchTerm$: Observable<string>;

  constructor() {
    this.searchTerm$ = this._searchTerm.asObservable()
      .pipe(
        debounceTime(400),
        shareReplay(1)
      );
  }

  setSearchTerm(term: string): void {
    this._searchTerm.next(term);
  }
}
