import mongoose from 'mongoose';
import { passwordHash } from 'src/@core/infra/utils/password-hash/password-hash.util';

type UserProps = {
  id?: string;
  name: string;
  lastname: string;
  email: string;
  password: string;
  document: string;
  documentName: string;
  roleId: string;
  createdAt?: Date;
  confirmed?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};

export class User {
  private readonly props: UserProps;

  private constructor(props: UserProps) {
    this.props = props;
  }

  static create(props: UserProps) {
    return new User(props);
  }

  get id() {
    if (this.props.id) {
      return new mongoose.Types.ObjectId().toString();
    }

    return this.props.id;
  }

  get name() {
    return (
      this.props.name.charAt(0).toUpperCase() +
      this.props.name.toLowerCase().slice(1)
    );
  }

  get lastname() {
    return (
      this.props.lastname.charAt(0).toUpperCase() +
      this.props.lastname.toLowerCase().slice(1)
    );
  }

  get email() {
    return this.props.email.toLowerCase();
  }

  get password() {
    return passwordHash(this.props.password);
  }

  get document() {
    return this.props.document;
  }

  get documentName() {
    return this.props.documentName;
  }

  get roleId() {
    return this.props.roleId;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get confirmed() {
    return this.props.confirmed;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  get deletedAt() {
    return this.props.deletedAt;
  }

  getUser() {
    return {
      id: this.id,
      name: this.name,
      lastname: this.lastname,
      email: this.email,
      password: this.password,
      document: this.document,
      documentName: this.documentName,
      roleId: this.roleId,
      createdAt: this.createdAt,
      confirmed: this.confirmed,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    } as User;
  }

  getUserJson() {
    return JSON.stringify(this.getUser());
  }
}
