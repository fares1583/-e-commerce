import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CardModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    FormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  private router = inject(Router);

  login() {
    if (this.username === 'admin' && this.password === 'admin') {
      localStorage.setItem('role', 'admin'); // Set admin role
      localStorage.setItem('logged-in', 'true');
      this.router.navigate(['/admin']); // Redirect to admin dashboard
    } else {
      localStorage.setItem('role', 'user'); // Set user role
      localStorage.setItem('logged-in', 'true');
      this.router.navigate(['/home']); // Redirect to home
    }
  }
}
