import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { ClubContentComponent } from '@app/dashboard/components/club-content/club-content.component';
import createSpyObj = jasmine.createSpyObj;
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MatDialog } from '@angular/material/dialog';
import { EMPTY, of } from 'rxjs';
import { SportClub } from '@core/models/sport-club.interface';
import { SportCategories } from '@core/models/sport-categories.enum';
import { getClubById } from '@app/dashboard/state/club.selectors';
import { deleteClub } from '../../state/club.actions';
import { ACCESS_TOKEN } from '../../../app.config';

describe('ClubContentComponent', () => {
  let component: ClubContentComponent;
  let fixture: ComponentFixture<ClubContentComponent>;
  let mockRouter: Router;
  let mockActivatedRoute;
  let mockMatDialog;
  let mockStore;

  const initialState = { clubs: [], error: '' };
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
    mockRouter = createSpyObj(['navigate']);
    mockMatDialog = createSpyObj(['open']);
    mockActivatedRoute = {
      params: of({
        id: 1
      })
    };

    await TestBed.configureTestingModule({
      declarations: [ClubContentComponent],
      providers: [
        {
          provide: Router,
          useValue: mockRouter
        },
        {
          provide: ActivatedRoute,
          useValue: mockActivatedRoute
        },
        {
          provide: MatDialog,
          useValue: mockMatDialog
        },
        {
          provide: ACCESS_TOKEN,
          useValue: ''
        },
        provideMockStore({ initialState })
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClubContentComponent);
    component = fixture.componentInstance;
    mockStore = TestBed.inject(MockStore);
    spyOn(mockStore, 'select').and.callFake((selector) => {
      if (selector === getClubById) {
        return of(mockClub);
      }
      if (selector === deleteClub) {
        return of(null);
      }
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open dialog form', () => {
    component.openFormDialog(mockClub);

    expect(mockMatDialog.open).toHaveBeenCalled();
  });
});
