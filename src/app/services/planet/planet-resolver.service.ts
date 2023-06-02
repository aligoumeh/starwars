import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, catchError, of } from 'rxjs';
import { Planet } from 'src/app/models/Planet';
import { PlanetService } from '../planet/planet.service';

@Injectable({
  providedIn: 'root'
})
export class PlanetResolverService implements Resolve<{ planets: Planet[]; count: number }> {

  constructor(private planetService: PlanetService) { }

  resolve(): Observable<{ planets: Planet[]; count: number }> {
    return this.planetService.getPlanet().pipe(
      catchError((error) => {
        console.error(error);
        return of({ planets: [], count: 0 });
      })
    );
  }
  
}