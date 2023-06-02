import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, switchMap } from 'rxjs';
import { Person, StarWarspecies } from 'src/app/models/Person';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SpeciesService {

  constructor(private http: HttpClient) { }

  getDetails(id: string): Observable<StarWarspecies> {    
    return this.http.get<Person>(`${environment.apiUrl}people/${id}`).pipe(
      switchMap((person: any) => {
        return this.http.get(person.homeworld).pipe(
          map((planet: any) => {
            const starWarSpecies: StarWarspecies = {
              id: person.id,
              name: person.name,
              gender: person.gender,
              birth_year: person.birth_year,
              home_name: planet.name,
              rotation_period: planet.rotation_period,
              population: planet.population
            };
            return starWarSpecies;
          })
        );
      })
    );
  }
  
}
