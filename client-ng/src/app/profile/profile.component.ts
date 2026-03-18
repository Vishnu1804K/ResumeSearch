import { Component, OnInit, inject } from '@angular/core';
import { LayoutComponent } from '../shared/layout.component';
import { ApiService } from '../core/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [LayoutComponent, CommonModule],
  template: `
    <app-layout>
      <div style="max-width: 800px; margin: 0 auto;">
        <h2 style="margin-top: 0;">My Profile</h2>
        <div *ngIf="user" class="auth-card" style="max-width: none;">
          <div style="display: grid; grid-template-columns: 150px 1fr; gap: 1rem; margin-bottom: 2rem;">
            <div style="font-weight: 600;">Username:</div>
            <div>{{ user.username }}</div>
            
            <div style="font-weight: 600;">Email:</div>
            <div>{{ user.email || 'Not provided' }}</div>

            <div style="font-weight: 600;">Full Name:</div>
            <div>{{ user.firstName }} {{ user.lastName }}</div>
          </div>
          <button class="btn-primary" style="width: auto;">Edit Profile</button>
        </div>
      </div>
    </app-layout>
  `,
})
export class ProfileComponent implements OnInit {
  private api = inject(ApiService);
  user: any;

  ngOnInit(): void {
    const stored = localStorage.getItem('ResumeUser');
    if (stored) {
      const { id } = JSON.parse(stored);
      this.api.getUser(id).subscribe(user => this.user = user);
    }
  }
}
