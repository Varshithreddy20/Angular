import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonPageComponent } from './person/person-page/person-page.component';
import { CountryPageComponent } from './country/country-page/country-page.component';

const routes: Routes = [
  { path: 'country', component: CountryPageComponent },
  { path: 'person', component: PersonPageComponent },
  { path: '', redirectTo: '/country', pathMatch: 'full' },
  { path: '**', redirectTo: '/country' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
