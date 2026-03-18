import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LayoutComponent } from '../shared/layout.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [LayoutComponent, RouterLink, MatButtonModule],
  template: `
    <app-layout>
      <div style="margin-bottom: 2rem;">
        <h2 style="margin-top: 0;">Resume Templates</h2>
        <p style="color: var(--secondary-color);">Select a template to start building your resume.</p>
      </div>

      <div class="template-grid">
        <div class="template-card">
          <div class="template-preview"></div>
          <div class="template-card-content">
            <h3>Clean Professional</h3>
            <p>Focused, ATS-friendly layout.</p>
            <button class="btn-primary" routerLink="/templates/1">
              Select Template
            </button>
          </div>
        </div>

        <div class="template-card">
          <div class="template-preview" style="background-color: #94a3b8;"></div>
          <div class="template-card-content">
            <h3>Modern Highlight</h3>
            <p>Bold headings with timeline sections.</p>
            <button class="btn-primary" routerLink="/templates/2">
              Select Template
            </button>
          </div>
        </div>
      </div>
    </app-layout>
  `,
})
export class HomeComponent {}

