import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LayoutComponent } from '../shared/layout.component';
import { ApiService } from '../core/api.service';
import { WebsocketService } from '../core/websocket.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [
    LayoutComponent,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  template: `
    <app-layout>
      <div style="display: grid; grid-template-columns: 1fr 350px; gap: 2rem;">
        <div>
          <h2 style="margin-top: 0;">Feedback & Comments</h2>
          
          <div class="auth-card" style="max-width: none; margin-bottom: 2rem; padding: 1.5rem;">
            <form [formGroup]="form" (ngSubmit)="submit()">
              <mat-form-field appearance="outline" class="w-full">
                <mat-label>Write a comment</mat-label>
                <textarea
                  matInput
                  rows="3"
                  formControlName="comment"
                  placeholder="Share your thoughts..."
                ></textarea>
              </mat-form-field>
              <button
                class="btn-primary"
                style="width: auto;"
                type="submit"
                [disabled]="form.invalid"
              >
                Post Comment
              </button>
            </form>
          </div>

          <div style="display: flex; flex-direction: column; gap: 1rem;">
            <div
              *ngFor="let c of comments"
              style="
                padding: 1rem;
                background: white;
                border-radius: 8px;
                border: 1px solid var(--border-color);
              "
            >
              <div
                style="
                  display: flex;
                  justify-content: space-between;
                  font-size: 0.875rem;
                  margin-bottom: 0.5rem;
                "
              >
                <span style="font-weight: 600; color: var(--primary-color);">{{ c.username }}</span>
                <span style="color: var(--secondary-color);">
                  {{ c.createdAt | date : 'medium' }}
                </span>
              </div>
              <div style="line-height: 1.5;">{{ c.comment }}</div>
            </div>
          </div>
        </div>

        <div *ngIf="user">
          <h2 style="margin-top: 0;">Resume Preview</h2>
          <div
            style="
              background: white;
              border-radius: 8px;
              border: 1px solid var(--border-color);
              padding: 1.5rem;
            "
          >
            <h3 style="margin-top: 0; margin-bottom: 0.5rem;">
              {{ user.firstName }} {{ user.lastName }}
            </h3>
            <p style="margin: 0; font-size: 0.875rem; color: var(--secondary-color);">
              {{ user.email }}
            </p>
            <p style="margin: 0.25rem 0; font-size: 0.875rem; color: var(--secondary-color);">
              {{ user.mobileNumber }}
            </p>
            <p style="margin: 0; font-size: 0.875rem; color: var(--primary-color);">
              {{ user.portfolio }}
            </p>
          </div>
        </div>
      </div>
    </app-layout>
  `,
})
export class CommentsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private api = inject(ApiService);
  private fb = inject(FormBuilder);
  private ws = inject(WebsocketService);

  form: FormGroup = this.fb.group({
    comment: ['', Validators.required],
  });

  postId!: string;
  comments: any[] = [];
  user: any;

  ngOnInit(): void {
    this.postId = this.route.snapshot.paramMap.get('id') as string;
    this.load();

    this.ws.connect();
    this.ws.commentsStream().subscribe((msg) => {
      if (msg.postId === this.postId) {
        this.load();
      }
    });
  }

  load(): void {
    this.api.getComments(this.postId).subscribe((comments) => {
      this.comments = comments;
    });
    this.api.getUser(this.postId).subscribe((user) => (this.user = user));
  }

  submit(): void {
    if (this.form.invalid) return;
    const stored = localStorage.getItem('ResumeUser');
    if (!stored) return;
    const { username } = JSON.parse(stored);
    const commentText = this.form.value.comment;
    this.api
      .addComment(this.postId, {
        username,
        comment: commentText,
      })
      .subscribe(() => {
        this.form.reset();
        this.ws.sendComment(this.postId, username, commentText);
      });
  }
}

