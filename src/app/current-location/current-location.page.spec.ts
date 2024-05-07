import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CurrentLocationPage } from './current-location.page';

describe('CurrentLocationPage', () => {
  let component: CurrentLocationPage;
  let fixture: ComponentFixture<CurrentLocationPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentLocationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
