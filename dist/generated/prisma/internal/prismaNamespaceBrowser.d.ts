import * as runtime from "@prisma/client/runtime/index-browser";
export type * from '../models';
export type * from './prismaNamespace';
export declare const Decimal: typeof runtime.Decimal;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
export declare const DbNull: import("@prisma/client/runtime/client").DbNullClass;
export declare const JsonNull: import("@prisma/client/runtime/client").JsonNullClass;
export declare const AnyNull: import("@prisma/client/runtime/client").AnyNullClass;
export declare const ModelName: {
    readonly User: "User";
    readonly Billing: "Billing";
    readonly Order: "Order";
    readonly Jurisdiction: "Jurisdiction";
    readonly OrderOnJurisdiction: "OrderOnJurisdiction";
    readonly TaxRate: "TaxRate";
    readonly Role: "Role";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: "ReadUncommitted";
    readonly ReadCommitted: "ReadCommitted";
    readonly RepeatableRead: "RepeatableRead";
    readonly Serializable: "Serializable";
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const UserScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly surname: "surname";
    readonly email: "email";
    readonly password: "password";
    readonly createdAt: "createdAt";
    readonly roleId: "roleId";
};
export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];
export declare const BillingScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly paymentMethod: "paymentMethod";
    readonly details: "details";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type BillingScalarFieldEnum = (typeof BillingScalarFieldEnum)[keyof typeof BillingScalarFieldEnum];
export declare const OrderScalarFieldEnum: {
    readonly id: "id";
    readonly subtotal: "subtotal";
    readonly composite_tax_rate: "composite_tax_rate";
    readonly tax_amount: "tax_amount";
    readonly total_amount: "total_amount";
    readonly timestamp: "timestamp";
    readonly created_at: "created_at";
    readonly updated_at: "updated_at";
    readonly userId: "userId";
};
export type OrderScalarFieldEnum = (typeof OrderScalarFieldEnum)[keyof typeof OrderScalarFieldEnum];
export declare const JurisdictionScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
};
export type JurisdictionScalarFieldEnum = (typeof JurisdictionScalarFieldEnum)[keyof typeof JurisdictionScalarFieldEnum];
export declare const OrderOnJurisdictionScalarFieldEnum: {
    readonly order_id: "order_id";
    readonly jurisdiction_id: "jurisdiction_id";
};
export type OrderOnJurisdictionScalarFieldEnum = (typeof OrderOnJurisdictionScalarFieldEnum)[keyof typeof OrderOnJurisdictionScalarFieldEnum];
export declare const TaxRateScalarFieldEnum: {
    readonly id: "id";
    readonly rate: "rate";
    readonly type: "type";
    readonly created_at: "created_at";
    readonly updated_at: "updated_at";
    readonly jurisdiction_id: "jurisdiction_id";
};
export type TaxRateScalarFieldEnum = (typeof TaxRateScalarFieldEnum)[keyof typeof TaxRateScalarFieldEnum];
export declare const RoleScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly description: "description";
    readonly permissions: "permissions";
};
export type RoleScalarFieldEnum = (typeof RoleScalarFieldEnum)[keyof typeof RoleScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: "asc";
    readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const JsonNullValueInput: {
    readonly JsonNull: import("@prisma/client/runtime/client").JsonNullClass;
};
export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput];
export declare const QueryMode: {
    readonly default: "default";
    readonly insensitive: "insensitive";
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
export declare const JsonNullValueFilter: {
    readonly DbNull: import("@prisma/client/runtime/client").DbNullClass;
    readonly JsonNull: import("@prisma/client/runtime/client").JsonNullClass;
    readonly AnyNull: import("@prisma/client/runtime/client").AnyNullClass;
};
export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter];
export declare const NullsOrder: {
    readonly first: "first";
    readonly last: "last";
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
