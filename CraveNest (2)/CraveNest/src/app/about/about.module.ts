import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about.component';
import { RouterModule } from '@angular/router';
import { HeaderModule } from '../header/header.module';
import { FooterModule } from '../footer/footer.module';

@NgModule({
  declarations: [AboutComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: AboutComponent }]),
    HeaderModule,
    FooterModule,
  ],
  exports: [HeaderModule, FooterModule],
})
export class AboutModule {}
