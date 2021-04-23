import { TestBed } from '@angular/core/testing';

import { SportClubsService } from './sport-clubs.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SportClub } from '@core/models/sport-club.interface';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { SportCategories } from '@core/models/sport-categories.enum';

describe('SportClubsService', () => {
  let service: SportClubsService;
  let httpTestingController: HttpTestingController;
  let httpClient: HttpClient;
  let mockSportClubsData: SportClub[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(SportClubsService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('get Clubs', () => {
    it('should get Clubs', () => {
      mockSportClubsData = [
        {
          id: 1,
          name: 'Stomil Grudziądz',
          category: SportCategories.FOOTBALL,
          description: 'Klub piłkarski założony w 1925 roku. Sekcje dla różnych grup wiekowych',
          localization: {
            place_name: 'Ludwika Waryńskiego 75, 86-300 Grudziądz, Kuyavian-Pomeranian Voivodeship, Poland',
            center: [18.7742108, 53.4858149]
          }
        }
      ];

      httpClient.get<SportClub[]>('/clubs').subscribe((data) => {
        expect(data).toEqual(mockSportClubsData);
      });

      const req = httpTestingController.expectOne('/clubs');
      expect(req.request.method).toEqual('GET');

      req.flush(mockSportClubsData);
      httpTestingController.verify();
    });

    it('should throw 404 error', () => {
      const errMessage = '404 error';

      httpClient.get<SportClub[]>('/clubs').subscribe(
        () => fail('should have failed with the 404 error'),
        (error: HttpErrorResponse) => {
          expect(error.status).toEqual(404, 'status');
          expect(error.error).toEqual(errMessage, 'message');
        }
      );

      const req = httpTestingController.expectOne('/clubs');

      req.flush(errMessage, { status: 404, statusText: 'Not Found' });
      httpTestingController.verify();
    });
  });

  describe('deleteClub', () => {
    it('should delete correct data', () => {
      service.deleteClub(1).subscribe((data) => {
        expect(data).toBe(1);
      });

      const req = httpTestingController.expectOne('/clubs/1');
      expect(req.request.method).toEqual('DELETE');

      req.flush(1);
      httpTestingController.verify();
    });
  });

  describe('updateClub', () => {
    it('should put correct data', () => {
      const newMockSportClubData: SportClub = {
        id: 1,
        name: 'Test Name',
        category: SportCategories.FOOTBALL,
        description: 'Klub piłkarski założony w 1925 roku. Sekcje dla różnych grup wiekowych',
        localization: {
          place_name: 'Ludwika Waryńskiego 75, 86-300 Grudziądz, Kuyavian-Pomeranian Voivodeship, Poland',
          center: [18.7742108, 53.4858149]
        }
      };

      service.updateClub(newMockSportClubData).subscribe((data: SportClub) => {
        expect(data.name).toBe('Test Name');
      });

      const req = httpTestingController.expectOne('/clubs/1');
      expect(req.request.method).toEqual('PUT');

      req.flush(newMockSportClubData);
      httpTestingController.verify();
    });
  });

  describe('addClub', () => {
    it('should add Club', () => {
      const newMockSportClubData: SportClub = {
        id: 2,
        name: 'Test Name',
        category: SportCategories.FOOTBALL,
        description: 'Klub piłkarski założony w 1925 roku. Sekcje dla różnych grup wiekowych',
        localization: {
          place_name: 'Ludwika Waryńskiego 75, 86-300 Grudziądz, Kuyavian-Pomeranian Voivodeship, Poland',
          center: [18.7742108, 53.4858149]
        }
      };

      service.addClub(newMockSportClubData).subscribe((data: SportClub) => {
        expect(data).toBe(newMockSportClubData);
      });

      const req = httpTestingController.expectOne('/clubs');
      expect(req.request.method).toEqual('POST');

      req.flush(newMockSportClubData);
      httpTestingController.verify();
    });
  });
});
