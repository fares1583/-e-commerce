import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const isLoggedIn = localStorage.getItem('logged-in') === 'true'; // Check login status
    if (isLoggedIn) {
      return true; // Allow access if logged in
    }
    this.router.navigate(['/login']); // Redirect to login if not logged in
    return false;
  }
}

@Injectable({
  providedIn: 'root',
})
export class NotAuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const isLoggedIn = localStorage.getItem('logged-in') === 'true'; // Check login status
    if (!isLoggedIn) {
      return true; // Allow access if not logged in
    }
    this.router.navigate(['/home']); // Redirect to home if already logged in
    return false;
  }
}
