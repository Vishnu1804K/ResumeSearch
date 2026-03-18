import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterLink, RouterOutlet, MatButtonModule],
  template: `
    <div class="layout-shell">
      <header class="layout-header">
        <h1>ResumeBuilder</h1>
        <nav class="layout-nav">
          <a routerLink="/home">Home</a>
          <a routerLink="/review">Review</a>
          <a routerLink="/profile">Profile</a>
          <a href="#" (click)="logout(); false">Logout</a>
        </nav>
      </header>
      <main class="layout-main">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
})
export class LayoutComponent {
  logout(): void {
    localStorage.removeItem('ResumeUser');
    location.href = '/login';
  }
}

