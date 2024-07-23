import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmerLandComponent } from './farmer-land.component';

describe('FarmerLandComponent', () => {
  let component: FarmerLandComponent;
  let fixture: ComponentFixture<FarmerLandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FarmerLandComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FarmerLandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
