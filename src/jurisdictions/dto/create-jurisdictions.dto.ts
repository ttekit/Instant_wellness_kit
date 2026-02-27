import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateJurisdictionDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    type: string;

    @IsString()
    @IsNotEmpty()
    fipsCode: string;

    @IsString()
    @IsNotEmpty()
    status: string;

    @IsNumber()
    rate: number;

    @IsNumber()
    local_rate: number;

    @IsOptional()
    @IsNumber()
    mctd?: number;

    @IsNumber()
    composite: number;
}
