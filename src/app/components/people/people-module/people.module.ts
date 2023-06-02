import { CUSTOM_ELEMENTS_SCHEMA, Injectable, NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PeopleComponent } from '../people.component';
import { SpeciesComponent } from '../../species-detail/species.component';
import { PeopleResolverService } from 'src/app/services/people/people-resolver.service';
import { SepeciesResolverService } from 'src/app/services/species/sepecies-resolver.service';
import { SharedModule } from '../../shared-module/shared.module';

const routes: Routes = [
  {
    path: '',
    component: PeopleComponent,
    resolve: {
      people: PeopleResolverService
    }
  },
  {
    path: ':id',
    component: SpeciesComponent,
    resolve: {
      speciesDetail: SepeciesResolverService
    }
  }
];

@NgModule({
  declarations: [
    PeopleComponent,
    SpeciesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    DecimalPipe
  ]

})

export class PeopleModule { }
