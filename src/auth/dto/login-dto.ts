import { ApiProperty } from '@nestjs/swagger';

export class LoginDTO {
  @ApiProperty({ example: 'silasmaques@outlook.com' })
  email: string;
  @ApiProperty({ example: '******' })
  password: string;
}
