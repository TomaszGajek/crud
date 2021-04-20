import { SportCategories } from './sport-categories.enum';

export interface SportClub {
  id?: number;
  name: string;
  category: SportCategories;
  description: string;
  localization: {
    center: number[];
    place_name: string;
  };
}
