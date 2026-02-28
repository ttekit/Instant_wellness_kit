import { IsInt, IsNotEmpty, IsObject, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PaymentMethodType } from 'src/generated/prisma/client'; // Corrected import path

export class CreateBillingDto {
  @ApiProperty({ description: 'The ID of the user this billing information belongs to', example: 1 })
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({
    description: 'The payment method used (e.g., CREDIT_CARD, PAYPAL, BANK_TRANSFER)',
    enum: PaymentMethodType,
    example: PaymentMethodType.CREDIT_CARD,
  })
  @IsEnum(PaymentMethodType)
  @IsNotEmpty()
  paymentMethod: PaymentMethodType;

  @ApiProperty({
    description: 'A JSON object containing the payment details (e.g., { "last4": "1234", "expMonth": 12, "expYear": 2025 } for credit card, or { "paypalEmail": "user@example.com" } for PayPal). Sensitive information like full card numbers or CVVs should NOT be stored here.',
    example: { last4: '1234', expMonth: 12, expYear: 2025, cardType: 'Visa' },
    type: 'object',
    additionalProperties: true,
  })
  @IsObject()
  @IsNotEmpty()
  details: object;
}