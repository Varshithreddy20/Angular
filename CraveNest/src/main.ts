import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http'; // Ensure this is imported
import { routes } from './app/app.routes';

// Include provideHttpClient in your providers array
bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(), // Make sure HttpClient is provided here
  ],
}).catch((err) => console.error(err));
