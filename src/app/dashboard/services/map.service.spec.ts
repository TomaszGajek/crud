import { TestBed } from '@angular/core/testing';

import { MapService } from './map.service';
import { Router } from '@angular/router';
import { SportClub } from '@core/models/sport-club.interface';
import { SportCategories } from '@core/models/sport-categories.enum';

describe('MapService', () => {
  let service: MapService;
  const mockSportClubsData: SportClub[] = [
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

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: Router, useValue: {} }]
    });
    service = TestBed.inject(MapService);

    spyOn(service, 'init');
    service.init(21.017532, 52.237049, 5, 'map', mockSportClubsData);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call init', () => {
    expect(service.init).toHaveBeenCalledOnceWith(21.017532, 52.237049, 5, 'map', mockSportClubsData);
  });

  it('should call createMarkers', () => {
    spyOn(service, 'createMarkers');
    service.createMarkers(mockSportClubsData);

    expect(service.createMarkers).toHaveBeenCalledOnceWith(mockSportClubsData);
  });

  it('should call createPopups', () => {
    spyOn(service, 'createPopups');
    service.createPopups();

    expect(service.createPopups).toHaveBeenCalled();
  });

  it('should call flyToSelectedPoint', () => {
    spyOn(service, 'flyToSelectedPoint');

    service.flyToSelectedPoint({ lng: 21.017532, lat: 52.237049 });

    expect(service.flyToSelectedPoint).toHaveBeenCalledWith({ lng: 21.017532, lat: 52.237049 });
  });

  it('should call zoomOut', () => {
    spyOn(service, 'zoomOut');

    service.zoomOut();

    expect(service.zoomOut).toHaveBeenCalled();
  });

  it('should call handleMarkerMouseEnterEvent', () => {
    spyOn(service, 'handleMarkerMouseEnterEvent');

    service.handleMarkerMouseEnterEvent();

    expect(service.handleMarkerMouseEnterEvent).toHaveBeenCalled();
  });

  it('should call handleMarkerMouseLeaveEvent', () => {
    spyOn(service, 'handleMarkerMouseLeaveEvent');

    service.handleMarkerMouseLeaveEvent();

    expect(service.handleMarkerMouseLeaveEvent).toHaveBeenCalled();
  });

  it('should call handleMarkerClickEvent', () => {
    spyOn(service, 'handleMarkerClickEvent');

    service.handleMarkerClickEvent();

    expect(service.handleMarkerClickEvent).toHaveBeenCalled();
  });
});
