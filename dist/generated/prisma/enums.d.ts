export declare const PaymentMethodType: {
    readonly CREDIT_CARD: "CREDIT_CARD";
    readonly PAYPAL: "PAYPAL";
    readonly BANK_TRANSFER: "BANK_TRANSFER";
};
export type PaymentMethodType = (typeof PaymentMethodType)[keyof typeof PaymentMethodType];
