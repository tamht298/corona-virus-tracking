import {Global} from './global';
import {Country} from './country';

export interface CoronaSummary {
  Global: Global;
  Countries: Country[];
  Date: string;
}
