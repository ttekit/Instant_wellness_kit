import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class CreateJurisdictionDto {
    // --- Поля Jurisdiction ---
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    code?: string; // По схеме обязательно, но есть дефолт

    @IsString()
    @IsOptional()
    fipsCode?: string; // На фронте/в DTO назовем fipsCode, в базу пойдет fipCode

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsOptional()
    type?: string;

    @IsString()
    @IsOptional()
    status?: string;

    // --- Поля TaxRate ---
    @IsNumber()
    @IsNotEmpty()
    rate: number; // В базе это Decimal, обязательно

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