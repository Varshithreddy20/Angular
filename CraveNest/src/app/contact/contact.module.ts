import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactComponent } from './contact.component';
import { HeaderModule } from '../header/header.module';
import { RouterModule } from '@angular/router';
import { FooterModule } from '../footer/footer.module';

@NgModule({
  declarations: [ContactComponent],
  imports: [
    CommonModule,
    HeaderModule,
    FooterModule,
    RouterModule.forChild([{ path: '', component: ContactComponent }]),
  ],
  exports: [HeaderModule, FooterModule],
})
export class ContactModule {}
