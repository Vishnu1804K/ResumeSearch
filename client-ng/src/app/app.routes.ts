import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login.component';
import { RegisterComponent } from './auth/register.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { TemplatesComponent } from './templates/templates.component';
import { ReviewComponent } from './review/review.component';
import { CommentsComponent } from './comments/comments.component';
import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'templates/:id', component: TemplatesComponent },
      { path: 'review', component: ReviewComponent },
      { path: 'comments/:id', component: CommentsComponent },
    ],
  },
  { path: '**', redirectTo: 'home' },
];

