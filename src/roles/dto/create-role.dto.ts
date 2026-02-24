import { IsString, IsOptional, IsArray, ArrayMinSize } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiProperty({ description: 'The name of the role', example: 'admin' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'A brief description of the role', example: 'Full access to all features', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'An array of permissions associated with the role',
    example: ['Users', 'Roles', 'Packages', 'Products', 'Orders', 'Settings', 'Tax Lookup'],
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  permissions: string[];
}