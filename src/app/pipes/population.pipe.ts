import { DecimalPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'population'
})

export class PopulationPipe implements PipeTransform {

  constructor(private decimalPipe: DecimalPipe) { }

  transform(value: any): string | null {
    if (value === 'unknown') {
      return value;
    }
    return this.decimalPipe.transform(parseFloat(value));
  }
  
}