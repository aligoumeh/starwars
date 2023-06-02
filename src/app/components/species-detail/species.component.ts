import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { StarWarspecies } from 'src/app/models/Person';
import { Location } from '@angular/common';

@Component({
  selector: 'app-species-detail',
  templateUrl: './species.component.html',
  styleUrls: ['./species.component.scss']
})
export class SpeciesComponent {

  starWarSpecies$: Observable<StarWarspecies | undefined>;

  constructor(private route: ActivatedRoute, private location: Location) {
    this.starWarSpecies$ = this.route.data.pipe(map(data => data['speciesDetail']));

  }

  goBack(): void {
    sessionStorage.setItem('fromDetailPage', 'true');
    this.location.back();
  }
}
