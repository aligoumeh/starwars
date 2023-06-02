import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'people',
        loadChildren: () => import('./components/people/people-module/people.module').then(m => m.PeopleModule),
      },
      {
        path: 'planets',
        loadChildren: () => import('./components/planet/planet-module/planet.module').then(m => m.PlanetModule)
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'people'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
