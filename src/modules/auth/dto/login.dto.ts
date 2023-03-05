import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    type: 'string',
    default: 'admin',
    description: 'User login',
  })
  @IsNotEmpty()
  @IsString()
  login: string;

  @ApiProperty({
    type: 'string',
    default: 'root',
    description: 'User password',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
