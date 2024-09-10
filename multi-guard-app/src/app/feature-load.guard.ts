import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FeatureLoadGuard implements CanLoad {
  canLoad(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> {
    const canLoadFeature = /* Your Load Logic */ true;
    return canLoadFeature;
  }
}
