import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportclubsComponent } from './sportclubs.component';

describe('SportclubsComponent', () => {
  let component: SportclubsComponent;
  let fixture: ComponentFixture<SportclubsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SportclubsComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SportclubsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
