import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ApiService } from '../core/api.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  template: `
    <div class="auth-background">
      <div class="auth-card">
        <h2>Sign In</h2>
        <p style="text-align: center; color: var(--secondary-color); margin-bottom: 2rem;">
          Enter your credentials to access your account.
        </p>

        <form [formGroup]="form" (ngSubmit)="onSubmit()">
          <mat-form-field appearance="outline" class="w-full">
            <mat-label>Username</mat-label>
            <input matInput formControlName="username" />
          </mat-form-field>

          <mat-form-field appearance="outline" class="w-full">
            <mat-label>Password</mat-label>
            <input
              matInput
              [type]="showPassword ? 'text' : 'password'"
              formControlName="password"
            />
            <button
              type="button"
              mat-icon-button
              matSuffix
              (click)="showPassword = !showPassword"
              tabindex="-1"
            >
              <mat-icon>{{
                showPassword ? 'visibility_off' : 'visibility'
              }}</mat-icon>
            </button>
          </mat-form-field>

          <button
            class="btn-primary"
            type="submit"
            [disabled]="form.invalid || loading"
          >
            {{ loading ? 'Signing in...' : 'Sign In' }}
          </button>
        </form>

        <p style="margin-top: 1.5rem; text-align: center; font-size: 0.875rem;">
          Don't have an account?
          <a routerLink="/register">Register here</a>
        </p>
      </div>
    </div>
  `,
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private api = inject(ApiService);
  private router = inject(Router);

  form: FormGroup = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  loading = false;
  showPassword = false;

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }
    this.loading = true;
    this.api.login(this.form.value).subscribe({
      next: (user) => {
        localStorage.setItem('ResumeUser', JSON.stringify(user));
        this.router.navigateByUrl('/home');
      },
      error: () => {
        this.loading = false;
        alert('Login failed');
      },
    });
  }
}

