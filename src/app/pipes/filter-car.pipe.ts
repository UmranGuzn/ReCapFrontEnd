import { Pipe, PipeTransform } from '@angular/core';
import { CarDetail } from '../models/carDetail';

@Pipe({
  name: 'filterCar'
})
export class FilterCarPipe implements PipeTransform {

  transform(value: CarDetail[], filterText: string): unknown {
    return null;
  }

}
