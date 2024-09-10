import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
})
export class AdminComponent {
  message = 'Admin Section - Only accessible if authenticated and authorized!';
}
