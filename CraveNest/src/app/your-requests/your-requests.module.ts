import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YourRequestsComponent } from './your-requests.component';
import { HeaderModule } from '../header/header.module';
import { FooterModule } from '../footer/footer.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [YourRequestsComponent],
  imports: [
    CommonModule,
    HeaderModule,
    FooterModule,
    RouterModule.forChild([{ path: '', component: YourRequestsComponent }]),
  ],
  exports: [HeaderModule, FooterModule],
})
export class YourRequestsModule {}
