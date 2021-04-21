import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubListComponent } from './club-list.component';
import { Store } from '@ngrx/store';
import { MapService } from '../../services/map.service';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MatDialog } from '@angular/material/dialog';

describe('ClubListComponent', () => {
  let component: ClubListComponent;
  let fixture: ComponentFixture<ClubListComponent>;
  let store: MockStore;
  const initialState = { clubs: [] };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClubListComponent],
      providers: [
        provideMockStore({ initialState }),
        { provide: MapService, useValue: {} },
        { provide: MatDialog, useValue: ['open'] }
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClubListComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
