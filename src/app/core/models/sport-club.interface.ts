import { SportCategories } from './sport-categories.enum';
import { Localization } from './localization.interface';

export interface SportClub {
  id?: number;
  name: string;
  category: SportCategories;
  description: string;
  localization: Localization;
}
