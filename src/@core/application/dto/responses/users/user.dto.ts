export class UserResponseDto {
  id?: string;
  fullName: string;
  email: string;
  password?: string;
  document?: string;
  documentName?: string;
  roleName?: string;
  confirmedAt?: Date;
  iat?: number;
  exp?: number;
}
