import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  profileData: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.profileData = this.route.snapshot.data['profileData'];
  }
}
