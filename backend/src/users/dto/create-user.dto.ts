import {IsString, IsEmail, MinLength, IsInt, IsNotEmpty} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({description: 'The first name of the user', example: 'John'})
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({description: 'The last name of the user', example: 'Doe'})
    @IsString()
    @IsNotEmpty()
    surname: string;

    @ApiProperty({description: 'The email address of the user', example: 'john.doe@example.com'})
    @IsEmail()
    email: string;

    @ApiProperty({description: 'The user\'s password (minimum 6 characters)', example: 'securepassword123'})
    @IsString()
    @MinLength(6, {message: 'Password must be at least 6 characters long'})
    password: string;

    @ApiProperty({description: 'The ID of the role assigned to the user', example: 1})
    @IsInt()
    roleId: number;
}