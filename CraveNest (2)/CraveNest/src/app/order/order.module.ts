import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderComponent } from './order.component';
import { RouterModule } from '@angular/router';
import { HeaderModule } from '../header/header.module';
import { FoodComponent } from '../food/food.component';
import { FooterModule } from '../footer/footer.module';

@NgModule({
  declarations: [OrderComponent],
  imports: [
    CommonModule,
    HeaderModule,
    FooterModule,
    RouterModule.forChild([{ path: '', component: OrderComponent }]),
  ],
  exports: [HeaderModule, FooterModule],
})
export class OrderModule {}
