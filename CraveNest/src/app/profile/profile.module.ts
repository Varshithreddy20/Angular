import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { HeaderModule } from '../header/header.module';
import { FooterModule } from '../footer/footer.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    HeaderModule,
    FooterModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: ProfileComponent }]),
  ],
  exports: [HeaderModule, FooterModule],
})
export class ProfileModule {}
