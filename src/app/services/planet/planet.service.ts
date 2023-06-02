import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, map, of } from 'rxjs';
import { Planet } from 'src/app/models/Planet';
import { PlanetApiResponse } from 'src/app/models/Response';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlanetService {

  private currentPage = 1;
  private readonly itemsPerPage = 10;
  private maxPage?: number;

  constructor(private http: HttpClient) { }

  getPlanet(): Observable<{ planets: Planet[]; count: number }> {
    this.currentPage = 1;
    this.maxPage = undefined;
    const page1 = this.http.get<PlanetApiResponse>(`${environment.apiUrl}planets/?page=${this.currentPage}`);
    const page2 = this.http.get<PlanetApiResponse>(`${environment.apiUrl}planets/?page=${this.currentPage + 1}`);

    return forkJoin([page1, page2])
      .pipe(
        map(responses => {
          const planets = responses.flatMap(response => response.results.map(planet => {
            if (planet.url) {
              planet.id = planet.url.split('/').slice(-2)[0];
            }
            return {
              id: planet.id,
              name: planet.name,
              population: planet.population,
            };
          }));
          const count = responses[0].count;
          this.maxPage = Math.ceil(count / this.itemsPerPage);

          return { planets, count };
        })
      );
  }

  getMorePlanet(): Observable<Planet[]> {
    this.currentPage += 2;
    if (this.maxPage !== undefined && this.currentPage > this.maxPage) {
      return of([]);
    }
    else if (this.currentPage === this.maxPage) {
      // Only call the first page as it's the last page available
      const page1 = this.http.get<PlanetApiResponse>(`${environment.apiUrl}planets/?page=${this.currentPage}`);
      return page1.pipe(
        map(response => {
          return response.results.map(planet => {
            if (planet.url) {
              planet.id = planet.url.split('/').slice(-2)[0];
            }
            return {
              id: planet.id,
              name: planet.name,
              population: planet.population,
            };
          })
        })
      );
    }
    else {
      const page1 = this.http.get<PlanetApiResponse>(`${environment.apiUrl}planets/?page=${this.currentPage}`);
      const page2 = this.http.get<PlanetApiResponse>(`${environment.apiUrl}planets/?page=${this.currentPage + 1}`);
      return forkJoin([page1, page2])
        .pipe(
          map(responses => {
            return responses.flatMap(response => response.results.map(planet => {
              if (planet.url) {
                planet.id = planet.url.split('/').slice(-2)[0];
              }
              return {
                id: planet.id,
                name: planet.name,
                population: planet.population,
              };
            }));
          })
        );
    }
  }
}

