import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuComponent } from './menu.component';
import { HeaderModule } from '../header/header.module';
import { FooterModule } from '../footer/footer.module';

@NgModule({
  declarations: [MenuComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: MenuComponent }]),
    HeaderModule,
    FooterModule,
  ],
  exports: [HeaderModule, FooterModule],
})
export class MenuModule {}
