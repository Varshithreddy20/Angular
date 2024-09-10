import { Component } from '@angular/core';
import { CanComponentDeactivate } from '../form-deactivate.guard';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
})
export class SettingsComponent implements CanComponentDeactivate {
  formDirty: boolean = true; // Simulating an unsaved form

  canDeactivate(): boolean {
    if (this.formDirty) {
      return confirm(
        'You have unsaved changes! Are you sure you want to leave?'
      );
    }
    return true;
  }
}
