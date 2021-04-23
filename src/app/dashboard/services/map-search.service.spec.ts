import { MapSearchService } from '@app/dashboard/services/map-search.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../../environments/environment';
import { LocalizationResponse } from '@core/models/localization-response.interface';

describe('MapSearchService', () => {
  let service: MapSearchService;
  let httpTestingController: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    service = TestBed.inject(MapSearchService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call get with the correct URL', () => {
    const query = encodeURIComponent('test');
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${environment.mapbox.accessToken}&autocomplete=true`;

    httpClient.get<{ features: LocalizationResponse }>(url).subscribe();

    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toEqual('GET');
    httpTestingController.verify();
  });
});
