import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { StarWarspecies } from 'src/app/models/Person';
import { SpeciesService } from './species.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SepeciesResolverService implements Resolve<StarWarspecies> {

  constructor(private speciesService: SpeciesService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<StarWarspecies> {
    const id = route.paramMap.get('id');
    if (id) {
      return this.speciesService.getDetails(id);
    }
    throw new Error('Invalid person ID');
  }

}

