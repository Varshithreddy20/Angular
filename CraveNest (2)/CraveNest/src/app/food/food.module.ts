import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoodComponent } from './food.component';
import { RouterModule } from '@angular/router';
import { HeaderModule } from '../header/header.module';
import { FooterModule } from '../footer/footer.module';

@NgModule({
  declarations: [FoodComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: FoodComponent }]),
    HeaderModule,
    FooterModule,
  ],
  exports: [HeaderModule, FooterModule],
})
export class FoodModule {}
