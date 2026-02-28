import { IsEnum, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Status } from 'src/generated/prisma/enums';

export class ChangeOrderStatusDto {
    @ApiProperty({ description: 'The new status for the order', enum: Status, example: Status.DELIVERING })
    @IsEnum(Status)
    @IsNotEmpty()
    status: Status;
}