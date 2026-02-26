import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class CreateJurisdictionDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    fipsCode?: string;

    @IsString()
    @IsOptional()
    type?: string;

    @IsString()
    @IsOptional()
    status?: string;

    @IsNumber()
    @IsNotEmpty()
    rate: number;

    @IsNumber()
    @IsOptional()
    local_rate?: number;

    @IsNumber()
    @IsOptional()
    tax_rate_type?: number; // Это поле type из TaxRate (Decimal)

    @IsNumber()
    @IsOptional()
    composite?: number;

    @IsNumber()
    @IsOptional()
    mctd?: number;
}