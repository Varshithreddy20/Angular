import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CountryRoutingModule } from './country-routing.module';
import { CountryComponent } from './country.component';
import { CountryPageComponent } from './country-page/country-page.component';

@NgModule({
  declarations: [CountryComponent, CountryPageComponent],
  imports: [CommonModule, CountryRoutingModule],
})
export class CountryModule {}
