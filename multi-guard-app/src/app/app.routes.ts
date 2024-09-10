import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './auth.guard';
import { AdminChildGuard } from './admin-child.guard';
import { FormDeactivateGuard } from './form-deactivate.guard';
import { ProfileResolverGuard } from './profile-resolver.guard';
import { FeatureLoadGuard } from './feature-load.guard';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'profile',
    component: ProfileComponent,
    resolve: { profileData: ProfileResolverGuard },
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AdminChildGuard],
    children: [{ path: 'settings', component: SettingsComponent }],
  },
  {
    path: 'settings',
    component: SettingsComponent,
    canDeactivate: [FormDeactivateGuard],
  },
  {
    path: 'lazy',
    loadChildren: () => import('./lazy/lazy.module').then((m) => m.LazyModule),
    canLoad: [FeatureLoadGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
