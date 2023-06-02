import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, Subscription, combineLatest, map, of, pluck, startWith } from 'rxjs';
import { Person } from 'src/app/models/Person';
import { ErrorService } from 'src/app/services/error/error.service';
import { PeopleService } from 'src/app/services/people/people.service';
import { SearchService } from 'src/app/services/search/search.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {

  public people$: Observable<Person[]> = of([]);
  public errorMessage?: string | null;
  public isNavigating = false;
  public isLoading = true;
  public hasError = false;
  public totalCount?: number;
  private subscriptions: Subscription[] = [];
  public isFetchingMore = false;
  private searchTerm$: Observable<string>;
  private allPeople$ = new BehaviorSubject<Person[]>([]);

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private errorService: ErrorService,
    protected peopleService: PeopleService,
    private searchService: SearchService,
  ) {
    this.searchTerm$ = this.searchService.searchTerm$;
  }
  ngOnInit(): void {

    if (sessionStorage.getItem('fromDetailPage')) {
      this.searchService.setSearchTerm('');
      sessionStorage.removeItem('fromDetailPage');
    }

    this.subscriptions.push(
      this.route.data.subscribe(data => {
        this.isLoading = true;
        this.allPeople$.next(data['people'].people);
        this.totalCount = data['people'].count;
        this.isLoading = false;
      })
    );

    this.subscriptions.push(
      this.errorService.errorMessage$.subscribe((errorMessage) => {
        this.errorMessage = errorMessage;
        if (errorMessage) this.hasError = true;
        this.isLoading = false;
      })
    );

    this.people$ = combineLatest([
      this.allPeople$.asObservable(),
      this.searchTerm$.pipe(startWith('')),
    ]).pipe(
      map(([people, searchTerm]) => {
        if (searchTerm === '') {
          return people;
        } else {
          return people.filter((person: any) =>
            person.name.toLowerCase().includes(searchTerm.toLowerCase()));
        }
      })
    );
  }

  goToDetail(id: string) {
    this.router.navigate(['people', id]);
  }

  getMorePeople() {
    this.isFetchingMore = true;
    this.peopleService.getMorePeople().subscribe(
      (newPeople) => {
        const currentPeople = this.allPeople$.getValue();
        this.allPeople$.next([...currentPeople, ...newPeople]);
        this.isFetchingMore = false;
      },
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

}
