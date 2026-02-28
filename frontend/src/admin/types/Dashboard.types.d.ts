export interface Billing {
    id: number;
    userId: number;
    paymentMethod: string;
    details: {
        last4: string;
        expYear: number;
        cardType: string;
        expMonth: number;
    };
    createdAt: string;
    updatedAt: string;
}
export interface BillingWithTax extends Billing {
    taxAmount: number;
    totalAmount: number;
}
