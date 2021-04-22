import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClubsComponent } from './clubs.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { loadClubs } from '@app/dashboard/state/club.actions';

describe('ClubsComponent', () => {
  let component: ClubsComponent;
  let fixture: ComponentFixture<ClubsComponent>;
  let store: MockStore;
  const initialState = { clubs: [], error: '' };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClubsComponent],
      providers: [provideMockStore({ initialState })]
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
    expect(store.dispatch).toHaveBeenCalledWith(loadClubs());
  });
});
