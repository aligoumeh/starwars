import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map, of } from 'rxjs';
import { Person } from '../../models/Person';
import { PeopleApiResponse } from '../../models/Response';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  private currentPage = 1;
  private readonly itemsPerPage = 10;
  private maxPage?: number;

  constructor(private http: HttpClient) { }

  getPeople(): Observable<{ people: Person[]; count: number }> {
    this.currentPage = 1;
    this.maxPage = undefined;
    const page1 = this.http.get<PeopleApiResponse>(`${environment.apiUrl}people/?page=${this.currentPage}`);
    const page2 = this.http.get<PeopleApiResponse>(`${environment.apiUrl}people/?page=${this.currentPage + 1}`);

    return forkJoin([page1, page2])
      .pipe(
        map(responses => {
          const people = responses.flatMap(response => response.results.map(person => {
            if (person.url) {
              person.id = person.url.split('/').slice(-2)[0];
            }
            return {
              id: person.id,
              name: person.name,
              gender: person.gender,
              birth_year: person.birth_year,
            };
          }));
          const count = responses[0].count;
          this.maxPage = Math.ceil(count / this.itemsPerPage);
          return { people, count };
        })
      );
  }

  getMorePeople(): Observable<Person[]> {
    this.currentPage += 2;
    if (this.maxPage !== undefined && this.currentPage > this.maxPage) {
      return of([]);
    }
    else if (this.currentPage === this.maxPage) {
      const page1 = this.http.get<PeopleApiResponse>(`${environment.apiUrl}people/?page=${this.currentPage}`);
      return page1.pipe(
        map(response => {
          return response.results.map(person => {
            if (person.url) {
              person.id = person.url.split('/').slice(-2)[0];
            }
            return {
              id: person.id,
              name: person.name,
              gender: person.gender,
              birth_year: person.birth_year,
            };
          });
        })
      );
    }
    else {
      const page1 = this.http.get<PeopleApiResponse>(`${environment.apiUrl}people/?page=${this.currentPage}`);
      const page2 = this.http.get<PeopleApiResponse>(`${environment.apiUrl}people/?page=${this.currentPage + 1}`);
      return forkJoin([page1, page2])
        .pipe(
          map(responses => {
            return responses.flatMap(response => response.results.map(person => {
              if (person.url) {
                person.id = person.url.split('/').slice(-2)[0];
              }
              return {
                id: person.id,
                name: person.name,
                gender: person.gender,
                birth_year: person.birth_year,
              };
            }));
          })
        );
    }
  }

}


