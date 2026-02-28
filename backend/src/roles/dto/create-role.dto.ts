import { IsString, IsOptional, IsArray, ArrayMinSize, IsNotEmpty, IsObject } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiProperty({ description: 'The name of the role', example: 'admin' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ description: 'A brief description of the role', example: 'Full access to all features', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'An array of permissions associated with the role',
    example: { users: ['read', 'create', 'update', 'delete'], orders: ['read'] },
  })
  @IsObject()
  @IsNotEmpty()
  permissions: object;
}