import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClubsComponent } from './clubs.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { loadData } from '@app/dashboard/state/club.actions';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

describe('ClubsComponent', () => {
  let component: ClubsComponent;
  let fixture: ComponentFixture<ClubsComponent>;
  let store: MockStore;
  const initialState = { clubs: [], error: '' };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClubsComponent],
      imports: [BrowserAnimationsModule, NoopAnimationsModule, RouterTestingModule],
      providers: [provideMockStore({ initialState })],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    store = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClubsComponent);
    component = fixture.componentInstance;
    spyOn(store, 'dispatch');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadClubs action', () => {
    expect(store.dispatch).toHaveBeenCalledWith(loadData());
  });
});
