import { passwordHash } from 'src/@core/infra/utils/password-hash/password-hash.util';
import { objectId } from 'src/@core/infra/utils/uuid/uuid.util';

type UserProps = {
  id?: string;
  fullName: string;
  email: string;
  password: string;
  document: string;
  documentName: string;
  roleName: string;
  restrictedForAuction: boolean;
  createdAt?: Date;
  updatedAt?: Date;
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
      return objectId();
    }

    return this.props.id;
  }
  get fullName() {
    return (
      this.props.fullName.charAt(0).toUpperCase() +
      this.props.fullName.toLowerCase().slice(1)
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

  get roleName() {
    return this.props.roleName;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  get restrictedForAuction() {
    return this.props.restrictedForAuction;
  }

  getUser() {
    return {
      id: this.id,
      fullName: this.fullName,
      // lastname: this.lastname,
      email: this.email,
      password: this.password,
      document: this.document,
      documentName: this.documentName,
      roleName: this.roleName,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      restrictedForAuction: this.props.restrictedForAuction,
    } as User;
  }

  getUserJson() {
    return JSON.stringify(this.getUser());
  }
}
