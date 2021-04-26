import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { ClubListComponent } from './club-list.component';
import { MapService } from '../../services/map.service';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MatDialog } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { DrawerService } from '@app/dashboard/services/drawer.service';
import createSpyObj = jasmine.createSpyObj;
import { SportClub } from '@core/models/sport-club.interface';
import { SportCategories } from '@core/models/sport-categories.enum';
import { of } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';

describe('ClubListComponent', () => {
  let component: ClubListComponent;
  let fixture: ComponentFixture<ClubListComponent>;
  let mockDrawerService: DrawerService;
  let mockDialog;
  let mockMapService;
  let mockBreakPointObserver;
  let smallWidthObserverOutput;

  const initialState = { clubs: [] };
  const mockClub: SportClub = {
    id: 1,
    name: 'Stomil Grudziądz',
    category: SportCategories.FOOTBALL,
    description: 'Klub piłkarski założony w 1925 roku. Sekcje dla różnych grup wiekowych',
    localization: {
      place_name: 'Ludwika Waryńskiego 75, 86-300 Grudziądz, Kuyavian-Pomeranian Voivodeship, Poland',
      center: [18.7742108, 53.4858149]
    }
  };

  beforeEach(async () => {
    mockDrawerService = createSpyObj(['setDrawerClosed']);
    mockDialog = createSpyObj(['open']);
    mockMapService = createSpyObj(['flyToSelectedPoint']);
    mockBreakPointObserver = jasmine.createSpyObj('BreakpointObserver', ['observe']);
    smallWidthObserverOutput = mockBreakPointObserver.observe.and.returnValue(of(true));

    await TestBed.configureTestingModule({
      declarations: [ClubListComponent],
      providers: [
        provideMockStore({ initialState }),
        { provide: MapService, useValue: mockMapService },
        { provide: MatDialog, useValue: mockDialog },
        { provide: DrawerService, useValue: mockDrawerService },
        { provide: BreakpointObserver, useValue: mockBreakPointObserver }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClubListComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should display error when TwainService fails', fakeAsync(() => {
  //   smallWidthObserverOutput.and.returnValue(false);
  //
  //   fixture.detectChanges();
  //
  //   tick();
  //
  //   fixture.detectChanges();
  //
  //   expect(component.smallDevice).toBe(false);
  // }));

  it('should set drawer closed status to true when button is clicked', () => {
    const button = fixture.debugElement.query(By.css('.close-drawer-button'));
    button.triggerEventHandler('click', null);

    fixture.detectChanges();

    expect(mockDrawerService.setDrawerClosed).toHaveBeenCalledWith(true);
  });

  it('should open mat dialog when add button is clicked', () => {
    const button = fixture.debugElement.query(By.css('.add-club-button'));
    button.triggerEventHandler('click', null);

    fixture.detectChanges();

    expect(mockDialog.open).toHaveBeenCalled();
  });

  it('should fly to selected point on map when handleSelectedClub is called', () => {
    component.handleSelectedClub(mockClub);

    fixture.detectChanges();

    expect(mockMapService.flyToSelectedPoint).toHaveBeenCalledWith({
      lng: mockClub.localization.center[0],
      lat: mockClub.localization.center[1]
    });
  });
});
