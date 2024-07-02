/* eslint-disable @typescript-eslint/no-explicit-any */
import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { Ilogin } from '../models/Auth.interface';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

describe('AuthService', () => {
  let authService: AuthService;
  let httpTestingController: HttpTestingController;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [AuthService],
    });
    authService = TestBed.inject(AuthService);
    spyOn(localStorage, 'setItem');
    router = TestBed.inject(Router);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should return an Observable<Ilogin> on successful login', () => {
    const mockResponse: Ilogin = {
      id: 1,
      username: 'testUser',
      role: 'user',
      token: 'mockToken',
    };

    authService
      .login('testUser', 'testPassword')
      .subscribe((response: Ilogin) => {
        expect(response).toEqual(mockResponse);
      });

    const req = httpTestingController.expectOne(`${authService.apiUrl}/login`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should return an error on login with incorrect credentials', () => {
    const errorMessage = 'Incorrect username or password';

    authService.login('invalidUser', 'invalidPassword').subscribe(
      () => {},
      (error: any) => {
        expect(error).toBe(errorMessage);
      },
    );

    const req = httpTestingController.expectOne(`${authService.apiUrl}/login`);
    expect(req.request.method).toBe('POST');
    req.flush(errorMessage, { status: 401, statusText: 'Unauthorized' });
  });

  it('should store the token in localStorage', () => {
    const token = 'mockToken';
    authService.storeToken(token);
    expect(localStorage.setItem).toHaveBeenCalledWith('token', token);
  });

  it('should return the token from localStorage if it exists', () => {
    const mockToken = 'mockToken';
    spyOn(localStorage, 'getItem').and.returnValue(mockToken);

    const result = authService.getToken();

    expect(result).toBe(mockToken);
  });

  it('should return an empty string if the token does not exist in localStorage', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);

    const result = authService.getToken();

    expect(result).toBe('');
  });

  it('should return true if getToken() returns a token', () => {
    spyOn(authService, 'getToken').and.returnValue('dummyToken');
    expect(authService.hasAccess()).toBe(true);
  });

  it('should return false if getToken() returns an empty string', () => {
    spyOn(authService, 'getToken').and.returnValue('');
    expect(authService.hasAccess()).toBe(false);
  });

  it('should navigate to the login page', () => {
    spyOn(router, 'navigate');
    authService.goLogin();
    expect(router.navigate).toHaveBeenCalledWith(['auth/login']);
  });
});
