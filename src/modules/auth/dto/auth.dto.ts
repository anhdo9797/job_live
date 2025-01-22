export class Auth {
  access_token: string;
  user: any;
}

export class SendEmailDto {
  email: string;
}

export class VerifyEmailDto {
  email: string;
  code: string;
}
