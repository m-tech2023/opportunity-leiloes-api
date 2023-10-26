import { hash } from 'src/@core/infra/utils/uuid/uuid.util';
import { passwordHash } from 'src/@core/infra/utils/password-hash/password-hash.util';

type UserProps = {
  id?: string;
  name: string;
  lastname: string;
  email: string;
  password: string;
  document: string;
  documentType?: string;
  role: string;
  createdAt: Date;
  confirmed?: Date;
  updatedAt?: Date;
  deleteAt?: Date;
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
    if (!this.props.id) {
      return hash();
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

  get documentType() {
    return this.props.documentType;
  }

  get role() {
    return this.props.role;
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

  get deleteAt() {
    return this.props.deleteAt;
  }

  getUser() {
    return {
      id: this.id,
      name: this.name,
      lastname: this.lastname,
      email: this.email,
      password: this.password,
      document: this.document,
      documentType: this.documentType,
      role: this.role,
      createdAt: this.createdAt,
      confirmed: this.confirmed,
      updatedAt: this.updatedAt,
      deleteAt: this.deleteAt,
    } as User;
  }

  getUserJson() {
    return JSON.stringify(this.getUser());
  }
}
