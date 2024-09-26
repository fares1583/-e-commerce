import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const role = localStorage.getItem('role'); // Get the user role
    if (role === 'admin') {
      return true; // Allow access if the user is admin
    }
    this.router.navigate(['/home']); // Redirect to home if not admin
    return false;
  }
}
