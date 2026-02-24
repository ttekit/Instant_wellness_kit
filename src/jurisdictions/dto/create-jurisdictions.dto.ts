import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateJurisdictionDto {
    @ApiProperty({ description: 'The name of the jurisdiction', example: 'California' })
    @IsString()
    @IsNotEmpty()
    name: string;
}