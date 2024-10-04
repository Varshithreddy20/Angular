import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { UpdateProfileModel } from '../profile/profile.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  name: string | null = null;
  emailId: string | null = null;
  oldPassword: string = ''; // For password confirmation
  newPassword: string = ''; // For changing password
  isEditing: boolean = false; // Track if user is editing profile
  editName: string = '';
  editEmail: string = '';
  isLoggedIn: boolean = false;
  isPasswordConfirmed: boolean = false; // Track if password is confirmed

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    if (this.isLoggedIn) {
      this.name = this.authService.getName();
      this.emailId = this.authService.getEmail();
    } else {
      this.router.navigate(['/login']);
    }
  }

  // Enable edit mode
  enableEditing() {
    this.isEditing = true;
  }

  // Cancel editing mode
  cancelEdit() {
    this.isEditing = false;
    this.oldPassword = '';
    this.newPassword = '';
    this.isPasswordConfirmed = false; // Reset password confirmation state
  }

  // Confirm the old password before enabling editing
  confirmOldPassword() {
    if (!this.oldPassword) {
      alert('Please confirm your old password.');
      return;
    }

    // Call the UserService to confirm the password
    this.userService.confirmPassword(this.emailId!, this.oldPassword).subscribe(
      (confirmed) => {
        if (confirmed) {
          this.isPasswordConfirmed = true;
          alert('Password confirmed. You may now edit your details.');
        } else {
          alert('Old password is incorrect');
        }
      },
      (error) => {
        alert('Error confirming old password');
      }
    );
  }

  // Save the changes to the profile
  saveChanges() {
    const signUpId = this.authService.getSignUpID();

    if (signUpId === null) {
      alert('Sign-up ID is missing. Unable to update profile.');
      return;
    }

    const updatedUser: UpdateProfileModel = {
      signUpId: signUpId,
      name: this.editName,
      emailId: this.editEmail,
      newPassword: this.newPassword ? this.newPassword : undefined,
    };

    this.userService.updateUserDetails(updatedUser).subscribe(
      (response) => {
        alert('Profile updated successfully');
        this.isEditing = false;
        this.isPasswordConfirmed = false;
        this.name = this.editName;
        this.emailId = this.editEmail;
        this.authService.setSession(
          this.authService.getToken()!,
          this.emailId!,
          this.name!,
          signUpId,
          1
        );
      },
      (error) => {
        alert('Error updating profile');
      }
    );
  }
}
