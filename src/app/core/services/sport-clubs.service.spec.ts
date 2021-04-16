import { TestBed } from '@angular/core/testing';

import { SportClubsService } from './sport-clubs.service';

describe('SportClubsService', () => {
  let service: SportClubsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SportClubsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
