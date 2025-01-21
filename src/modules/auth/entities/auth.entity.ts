import { User } from 'src/modules/users/entities/user.schema';

export class Auth {
  access_token: string;
  user: User;
}
