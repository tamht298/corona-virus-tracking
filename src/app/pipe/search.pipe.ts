import { Pipe, PipeTransform } from '@angular/core';
import {Country} from '../models/country';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(countryData: any, query: string): any {
    if(!query) {
      return countryData;
    }
    return countryData.filter((country) => {
       return country.Country.toLowerCase().includes(query.toLowerCase());
    });
  }

}
