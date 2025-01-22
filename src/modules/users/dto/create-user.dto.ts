import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { ROLES } from 'src/common/constants/role.enum';
export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty({ message: i18nValidationMessage('validation.NOT_EMPTY') })
  @IsEmail({}, { message: 'validation.INVALID_EMAIL' })
  email: string;

  @ApiProperty()
  @IsNotEmpty({ message: i18nValidationMessage('validation.NOT_EMPTY') })
  password: string;

  @ApiProperty()
  @IsNotEmpty({ message: i18nValidationMessage('validation.NOT_EMPTY') })
  name: string;

  @ApiPropertyOptional({
    default: 'user',
    enum: ROLES,
  })
  @ApiProperty({ default: 'user', enum: ROLES })
  @IsEnum(ROLES)
  role: string;

  @ApiProperty({
    description: "User's verification code after sending OTP (send-otp)",
  })
  code: string;
}

export class LoginUserDto {
  @ApiProperty()
  @IsNotEmpty({ message: i18nValidationMessage('validation.NOT_EMPTY') })
  email: string;

  @ApiProperty()
  @IsNotEmpty({ message: i18nValidationMessage('validation.NOT_EMPTY') })
  password: string;
}
