import { objectId } from "src/@core/infra/utils/uuid/uuid.util";

type AccessLogProps = {
  uuid?: string;
  userId: string;
  ip: string;
  geolocalization: string;
  accessedAt: Date;
  browser: string;
};

export class AccessLog {
  private readonly props: AccessLogProps;

  private constructor(props: AccessLogProps) {
    this.props = props;
  }

  static create(props: AccessLogProps) {
    return new AccessLog(props);
  }

  get uuid() {
    if (!this.props.uuid) {
      return objectId();
    }

    return this.props.uuid;
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

  get accessedAt() {
    return this.props.accessedAt;
  }

  get browser() {
    return this.props.browser;
  }
  getLog() {
    return {
      uuid: this.uuid,
      userId: this.userId,
      ip: this.ip,
      geolocalization: this.geolocalization,
      accessedAt: this.accessedAt,
      browser: this.browser,
    } as AccessLog;
  }

  getLogJson() {
    return JSON.stringify(this.getLog());
  }
}
