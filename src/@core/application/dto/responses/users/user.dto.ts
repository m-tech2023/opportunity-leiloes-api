export class UserResponseDto {
  _id?: string;
  name: string;
  lastname: string;
  email: string;
  password?: string;
  document?: string;
  documentName?: string;
  roleId?: string;
  confirmedAt?: Date;
  iat?: number;
  exp?: number;
}
