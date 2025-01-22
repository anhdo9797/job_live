export class CreateUserDto {
  email: string;
  password: string;
  name: string;
  role: 'user' | 'enterprise';
}

export class LoginUserDto {
  email: string;
  password: string;
}
