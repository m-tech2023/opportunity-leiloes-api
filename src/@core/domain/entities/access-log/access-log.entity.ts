import { objectId } from 'src/@core/infra/utils/uuid/uuid.util';

export type AccessLogProps = {
  id?: string;
  userId: string;
  ip: string;
  browser: string;
  geolocalization?: string;
};

export class AccessLog {
  private readonly props: AccessLogProps;

  private constructor(props: AccessLogProps) {
    this.props = props;
  }

  static create(props: AccessLogProps) {
    return new AccessLog(props);
  }

  get id() {
    if (!this.props.id) {
      return objectId();
    }

    return this.props.id;
  }

  get userId() {
    return this.props.userId;
  }

  get ip() {
    return this.props.ip;
  }

  get geolocalization() {
    return this.props.geolocalization;
  }

  get browser() {
    return this.props.browser;
  }

  getLog() {
    return {
      id: this.id,
      userId: this.userId,
      ip: this.ip,
      geolocalization: this.geolocalization,
      browser: this.browser,
    } as AccessLog;
  }

  getLogJson() {
    return JSON.stringify(this.getLog());
  }
}
