import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateJurisdictionDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ description: 'The type', example: "Territorial", required: false })
    @IsString()
    @IsNotEmpty()
    type: string;

    @ApiProperty({ description: 'The flipscode', example: "06037", required: false })
    @IsString()
    @IsNotEmpty()
    fipsCode: string;

    @ApiProperty({ description: 'The minimum latitude of the jurisdiction (optional)', example: 34.0522, required: false })
    @IsOptional()
    @IsNumber()
    minLat?: number;

    @ApiProperty({ description: 'The maximum latitude of the jurisdiction (optional)', example: 34.0522, required: false })
    @IsOptional()
    @IsNumber()
    maxLat?: number;

    @ApiProperty({ description: 'The minimum longitude of the jurisdiction (optional)', example: -118.2437, required: false })
    @IsOptional()
    @IsNumber()
    minLong?: number;

    @ApiProperty({ description: 'The maximum longitude of the jurisdiction (optional)', example: -118.2437, required: false })
    @IsOptional()
    @IsNumber()
    maxLong?: number;

    @ApiProperty({ description: 'The rate of the jurisdiction', example: 0.0725 })
    @IsNumber()
    rate: number;

    @ApiProperty({ description: 'The local rate of the jurisdiction', example: 0.01 })
    @IsNumber()
    local_rate: number;

    @ApiProperty({ description: 'The MCTD rate of the jurisdiction (optional)', example: 0.001, required: false })
    @IsOptional()
    @IsNumber()
    mctd?: number;

    @ApiProperty({ description: 'The composite rate of the jurisdiction', example: 0.0825 })
    @IsNumber()
    composite: number;
}
