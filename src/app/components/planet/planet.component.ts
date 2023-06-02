import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, Subscription, combineLatest, map, of, startWith } from 'rxjs';
import { Planet } from 'src/app/models/Planet';
import { ErrorService } from 'src/app/services/error/error.service';
import { PlanetService } from 'src/app/services/planet/planet.service';
import { SearchService } from 'src/app/services/search/search.service';

@Component({
  selector: 'app-planet',
  templateUrl: './planet.component.html',
  styleUrls: ['./planet.component.scss']
})
export class PlanetComponent implements OnInit {

  public planets$: Observable<Planet[]> = of([]);
  public errorMessage?: string | null;
  public isNavigating = false;
  public isLoading = true;
  public hasError = false;
  public totalCount?: number;
  private subscriptions: Subscription[] = [];
  public isFetchingMore = false;
  private searchTerm$: Observable<string>;
  private allPlanets$ = new BehaviorSubject<Planet[]>([]);

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private errorService: ErrorService,
    protected planetService: PlanetService,
    private searchService: SearchService

  ) {
    this.searchTerm$ = this.searchService.searchTerm$;
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.route.data.subscribe({
        next: (data) => {
          this.allPlanets$.next(data['planets'].planets);
          this.totalCount = data['planets'].count;
          this.isLoading = false;
        },
      })
    );

    this.subscriptions.push(
      this.errorService.errorMessage$.subscribe((errorMessage) => {
        this.errorMessage = errorMessage;
        if (errorMessage) this.hasError = true;
        this.isLoading = false;
      })
    );

    this.planets$ = combineLatest([
      this.allPlanets$.asObservable(),
      this.searchTerm$.pipe(startWith('')),
    ]).pipe(
      map(([planets, searchTerm]) => {
        if (searchTerm === '') {
          return planets;
        } else {
          return planets.filter((planet: any) =>
            planet.name.toLowerCase().includes(searchTerm.toLowerCase()));
        }
      })
    );
  }

  goToDetail(id: string) {
    this.router.navigate(['planets', id]);
  }

  getMorePlanets() {
    this.isFetchingMore = true;
    this.planetService.getMorePlanet().subscribe(
      (newPLanets) => {
        const currentPlanet = this.allPlanets$.getValue();
        this.allPlanets$.next([...currentPlanet, ...newPLanets]);
        this.isFetchingMore = false;
      },
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
  
}
