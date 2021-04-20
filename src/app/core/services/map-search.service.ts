import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalizationResponse } from '../models/localization-response.interface';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MapSearchService {
  constructor(private http: HttpClient) {}

  querySearch(value: string): Observable<LocalizationResponse> {
    const query = encodeURIComponent(value);
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${environment.mapbox.accessToken}&autocomplete=true`;

    return this.http
      .get<{ features: LocalizationResponse }>(url)
      .pipe(map((data: { features: LocalizationResponse }) => data.features));
  }
}
