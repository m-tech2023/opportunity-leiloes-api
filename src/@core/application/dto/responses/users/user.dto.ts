export class UserResponseDto {
  _id?: string;
  name: string;
  lastname: string;
  email: string;
  password?: string;
  iat?: number;
  exp?: number;
}
