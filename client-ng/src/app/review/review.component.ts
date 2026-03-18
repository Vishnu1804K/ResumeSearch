import { Component, OnInit, inject } from '@angular/core';
import { LayoutComponent } from '../shared/layout.component';
import { ApiService } from '../core/api.service';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [LayoutComponent, MatTableModule, MatButtonModule, RouterLink],
  template: `
    <app-layout>
      <div style="margin-bottom: 2rem;">
        <h2 style="margin-top: 0;">Discover Resumes</h2>
        <p style="color: var(--secondary-color);">Explore resumes shared by other users.</p>
      </div>

      <div class="auth-card" style="max-width: none; padding: 0; overflow: hidden;">
        <table
          mat-table
          [dataSource]="users"
          style="width: 100%;"
        >
          <ng-container matColumnDef="username">
            <th mat-header-cell *matHeaderCellDef style="padding: 1rem;"> Username </th>
            <td mat-cell *matCellDef="let user" style="padding: 1rem;">
              <a [routerLink]="['/comments', user.id]" style="color: var(--primary-color); font-weight: 600; text-decoration: none;">
                {{ user.username }}
              </a>
            </td>
          </ng-container>

          <ng-container matColumnDef="email">
            <th mat-header-cell *matHeaderCellDef style="padding: 1rem;"> Action </th>
            <td mat-cell *matCellDef="let user" style="padding: 1rem;">
              <button mat-stroked-button color="primary" (click)="email(user.email)">
                Contact
              </button>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns" style="background-color: #f8fafc;"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
        </table>
      </div>
    </app-layout>
  `,
})
export class ReviewComponent implements OnInit {
  private api = inject(ApiService);

  users: any[] = [];
  displayedColumns = ['username', 'email'];

  ngOnInit(): void {
    this.api.getUsers().subscribe((users) => (this.users = users));
  }

  email(email: string): void {
    if (!email) return;
    window.open(`mailto:${email}`, '_blank');
  }
}

