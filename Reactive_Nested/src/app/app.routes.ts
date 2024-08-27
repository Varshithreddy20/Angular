import { Routes } from '@angular/router';
import { ProfilePageComponent } from './profile-page/profile-page.component';

export const routes: Routes = [
  { path: 'profile', component: ProfilePageComponent },
  { path: '', redirectTo: '/profile', pathMatch: 'full' },
];
