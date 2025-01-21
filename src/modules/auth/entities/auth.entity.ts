import { User } from 'src/modules/users/schemas/user.schema';

export class Auth {
  access_token: string;
  user: User;
}
