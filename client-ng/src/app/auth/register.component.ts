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

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  template: `
    <div class="auth-background">
      <div class="auth-card">
        <h2>Create Account</h2>
        <p style="text-align: center; color: var(--secondary-color); margin-bottom: 2rem;">
          Join us to start building your professional resume.
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
              type="password"
              formControlName="password"
            />
          </mat-form-field>

          <mat-form-field appearance="outline" class="w-full">
            <mat-label>Confirm Password</mat-label>
            <input
              matInput
              type="password"
              formControlName="confirmPassword"
            />
          </mat-form-field>

          <button
            class="btn-primary"
            type="submit"
            [disabled]="form.invalid || loading"
          >
            {{ loading ? 'Creating account...' : 'Create Account' }}
          </button>
        </form>

        <p style="margin-top: 1.5rem; text-align: center; font-size: 0.875rem;">
          Already have an account?
          <a routerLink="/login">Sign in</a>
        </p>
      </div>
    </div>
  `,
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private api = inject(ApiService);
  private router = inject(Router);

  form: FormGroup = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
  });

  loading = false;

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }
    const { password, confirmPassword } = this.form.value;
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    this.loading = true;
    this.api.register(this.form.value).subscribe({
      next: () => {
        alert('Registration successful. Please sign in.');
        this.router.navigateByUrl('/login');
      },
      error: () => {
        this.loading = false;
        alert('Registration failed');
      },
    });
  }
}

