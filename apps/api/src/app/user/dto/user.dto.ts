export interface UserDto {
  userId: string;
  email: string;
  username: string;
}

export interface ResetPassDto {
  currentPassword: string;
  newPassword: string;
}
