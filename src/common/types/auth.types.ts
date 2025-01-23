import { User } from 'src/modules/users/entities/user.schema';

export interface UserTypeResponse {
  access_token: string;
  user: User;
}
