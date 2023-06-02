import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Person } from 'src/app/models/Person';
import { PeopleService } from './people.service';
import { Observable, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeopleResolverService implements Resolve<{ people: Person[]; count: number }> {

  constructor(private peopleService: PeopleService) { }

  resolve(): Observable<{ people: Person[]; count: number }> {
    return this.peopleService.getPeople().pipe(
      catchError((error) => {
        console.error(error);
        return of({ people: [], count: 0 });
      })
    );
  }
}