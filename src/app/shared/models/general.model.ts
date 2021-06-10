export class Route {
  url!: string;
  text!: string;
  icon!: string;
}

export enum MessageType {
  ERROR,
  INFO,
  SUCCESS
}

export class AuthData {
  username!: string;
  password!: string;
}

export class ApiResponse {
  message!: string;
}
