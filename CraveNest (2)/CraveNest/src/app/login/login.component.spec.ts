import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginComponent } from './login.component';
import { LoginService } from '../login.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockRouter = {
    navigate: jasmine.createSpy('navigate'),
  };
  let mockLoginService = {
    login: jasmine.createSpy('login').and.returnValue({
      subscribe: (
        success: (response: any) => void,
        error: (error: any) => void
      ) => success({ token: 'dummy-token' }),
    }),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: LoginService, useValue: mockLoginService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to home on successful login', () => {
    component.loginForm.setValue({
      email: 'test@test.com',
      password: 'password123',
    });
    component.onLogIn();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/home']);
  });
});
