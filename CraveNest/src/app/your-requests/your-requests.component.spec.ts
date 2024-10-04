import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YourRequestsComponent } from './your-requests.component';

describe('YourRequestsComponent', () => {
  let component: YourRequestsComponent;
  let fixture: ComponentFixture<YourRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YourRequestsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YourRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
