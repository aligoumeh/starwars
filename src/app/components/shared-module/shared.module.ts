import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopulationPipe } from 'src/app/pipes/population.pipe';

@NgModule({
  declarations: [
    PopulationPipe,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PopulationPipe,
  ]
})
export class SharedModule { }
