import { SportCategories } from './sport-categories.enum';

export interface SportClub {
  id: number;
  name: string;
  lat: number;
  lng: number;
  category: SportCategories;
  description: string;
}
