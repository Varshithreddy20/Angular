import { Component } from '@angular/core';
import { BusinessLandingComponent } from './business-landing/business-landing.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BusinessLandingComponent],
  template: '<app-business-landing></app-business-landing>',
})
export class AppComponent {}
