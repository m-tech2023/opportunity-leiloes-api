export class UserResponseDto {
  _id?: string;
  name: string;
  lastname: string;
  email: string;
  password?: string;
  document?: string;
  documentName?: string;
  roleId?: string;
  confirmed?: Date;
  iat?: number;
  exp?: number;
}
