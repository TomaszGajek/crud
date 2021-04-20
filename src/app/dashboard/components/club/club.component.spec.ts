import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubComponent } from './club.component';
import { SportClub } from '../../../core/models/sport-club.interface';

describe('ClubComponent', () => {
  let component: ClubComponent;
  let fixture: ComponentFixture<ClubComponent>;
  const clubMock: SportClub = {
    id: 1,
    name: 'Test',
    lat: 45.504323,
    lng: 18.3423231,
    description: 'Lorem ipsum'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClubComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.club = clubMock;

    fixture.detectChanges();

    expect(component).toBeTruthy();
  });
});
