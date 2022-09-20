import { SigninWithEmailDto, SininWithUsernameDto } from '../../auth/dto';

export interface UserDto {
  userId: string;
  email: string;
  username: string;
}

export interface UpdateUser extends SigninWithEmailDto, SininWithUsernameDto {}

export interface ResetPassDto {
  currentPassword: string;
  newPassword: string;
}
