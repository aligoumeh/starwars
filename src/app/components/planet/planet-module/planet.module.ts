import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PlanetComponent } from '../planet.component';
import { PlanetResolverService } from 'src/app/services/planet/planet-resolver.service';
import { SharedModule } from '../../shared-module/shared.module';

const routes: Routes = [
  {
    path: '',
    component: PlanetComponent,
    resolve: {
      planets: PlanetResolverService
    }
  }
];

@NgModule({
  declarations: [PlanetComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),

  ],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    DecimalPipe
  ]
})
export class PlanetModule { }
