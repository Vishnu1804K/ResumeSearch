import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LayoutComponent } from '../shared/layout.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-templates',
  standalone: true,
  imports: [LayoutComponent, RouterLink, CommonModule],
  template: `
    <app-layout>
      <div style="margin-bottom: 2rem;">
        <a routerLink="/home" style="text-decoration: none; color: var(--primary-color);">← Back to Templates</a>
        <h2 style="margin-top: 1rem;">Template Editor</h2>
        <p style="color: var(--secondary-color);">You are editing template #{{ templateId }}</p>
      </div>

      <div style="display: grid; grid-template-columns: 350px 1fr; gap: 2rem;">
        <div class="auth-card" style="max-width: none;">
          <h3>Editor Tools</h3>
          <p>Editor features coming soon...</p>
          <button class="btn-primary" style="margin-top: 1rem;">Save Changes</button>
        </div>
        
        <div style="background: white; border: 1px solid var(--border-color); border-radius: 8px; padding: 2rem; min-height: 600px;">
          <h3 style="text-align: center; color: #cbd5e1;">Resume Preview</h3>
        </div>
      </div>
    </app-layout>
  `,
})
export class TemplatesComponent implements OnInit {
  private route = inject(ActivatedRoute);
  templateId!: string;

  ngOnInit(): void {
    this.templateId = this.route.snapshot.paramMap.get('id') as string;
  }
}
