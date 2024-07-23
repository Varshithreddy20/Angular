import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessLandingComponent } from './business-landing.component';

describe('BusinessLandingComponent', () => {
  let component: BusinessLandingComponent;
  let fixture: ComponentFixture<BusinessLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessLandingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinessLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
