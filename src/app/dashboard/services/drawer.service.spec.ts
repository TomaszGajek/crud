import { DrawerService } from '@app/dashboard/services/drawer.service';
import { TestBed } from '@angular/core/testing';

describe('DrawerService', () => {
  let service: DrawerService;

  beforeEach(() => {
    service = TestBed.inject(DrawerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call setDrawerClosed', () => {
    spyOn(service, 'setDrawerClosed');

    service.setDrawerClosed(true);

    expect(service.setDrawerClosed).toHaveBeenCalledWith(true);
  });

  it('should call getDrawerState', () => {
    spyOn(service, 'getDrawerState');

    service.getDrawerState();

    expect(service.getDrawerState).toHaveBeenCalled();
  });
});
