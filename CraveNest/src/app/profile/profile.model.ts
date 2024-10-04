// Interface for the Confirm Password API request
export interface ConfirmPasswordModel {
  emailId: string;
  password: string;
}

// Interface for the Update Profile API request
export interface UpdateProfileModel {
  signUpId: number;
  name: string;
  emailId: string;
  newPassword?: string; // Optional new password
}
