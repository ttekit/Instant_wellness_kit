import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
export type BillingModel = runtime.Types.Result.DefaultSelection<Prisma.$BillingPayload>;
export type AggregateBilling = {
    _count: BillingCountAggregateOutputType | null;
    _avg: BillingAvgAggregateOutputType | null;
    _sum: BillingSumAggregateOutputType | null;
    _min: BillingMinAggregateOutputType | null;
    _max: BillingMaxAggregateOutputType | null;
};
export type BillingAvgAggregateOutputType = {
    id: number | null;
    userId: number | null;
};
export type BillingSumAggregateOutputType = {
    id: number | null;
    userId: number | null;
};
export type BillingMinAggregateOutputType = {
    id: number | null;
    userId: number | null;
    paymentMethod: $Enums.PaymentMethodType | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type BillingMaxAggregateOutputType = {
    id: number | null;
    userId: number | null;
    paymentMethod: $Enums.PaymentMethodType | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type BillingCountAggregateOutputType = {
    id: number;
    userId: number;
    paymentMethod: number;
    details: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type BillingAvgAggregateInputType = {
    id?: true;
    userId?: true;
};
export type BillingSumAggregateInputType = {
    id?: true;
    userId?: true;
};
export type BillingMinAggregateInputType = {
    id?: true;
    userId?: true;
    paymentMethod?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type BillingMaxAggregateInputType = {
    id?: true;
    userId?: true;
    paymentMethod?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type BillingCountAggregateInputType = {
    id?: true;
    userId?: true;
    paymentMethod?: true;
    details?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type BillingAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BillingWhereInput;
    orderBy?: Prisma.BillingOrderByWithRelationInput | Prisma.BillingOrderByWithRelationInput[];
    cursor?: Prisma.BillingWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | BillingCountAggregateInputType;
    _avg?: BillingAvgAggregateInputType;
    _sum?: BillingSumAggregateInputType;
    _min?: BillingMinAggregateInputType;
    _max?: BillingMaxAggregateInputType;
};
export type GetBillingAggregateType<T extends BillingAggregateArgs> = {
    [P in keyof T & keyof AggregateBilling]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateBilling[P]> : Prisma.GetScalarType<T[P], AggregateBilling[P]>;
};
export type BillingGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BillingWhereInput;
    orderBy?: Prisma.BillingOrderByWithAggregationInput | Prisma.BillingOrderByWithAggregationInput[];
    by: Prisma.BillingScalarFieldEnum[] | Prisma.BillingScalarFieldEnum;
    having?: Prisma.BillingScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: BillingCountAggregateInputType | true;
    _avg?: BillingAvgAggregateInputType;
    _sum?: BillingSumAggregateInputType;
    _min?: BillingMinAggregateInputType;
    _max?: BillingMaxAggregateInputType;
};
export type BillingGroupByOutputType = {
    id: number;
    userId: number;
    paymentMethod: $Enums.PaymentMethodType;
    details: runtime.JsonValue;
    createdAt: Date;
    updatedAt: Date;
    _count: BillingCountAggregateOutputType | null;
    _avg: BillingAvgAggregateOutputType | null;
    _sum: BillingSumAggregateOutputType | null;
    _min: BillingMinAggregateOutputType | null;
    _max: BillingMaxAggregateOutputType | null;
};
type GetBillingGroupByPayload<T extends BillingGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<BillingGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof BillingGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], BillingGroupByOutputType[P]> : Prisma.GetScalarType<T[P], BillingGroupByOutputType[P]>;
}>>;
export type BillingWhereInput = {
    AND?: Prisma.BillingWhereInput | Prisma.BillingWhereInput[];
    OR?: Prisma.BillingWhereInput[];
    NOT?: Prisma.BillingWhereInput | Prisma.BillingWhereInput[];
    id?: Prisma.IntFilter<"Billing"> | number;
    userId?: Prisma.IntFilter<"Billing"> | number;
    paymentMethod?: Prisma.EnumPaymentMethodTypeFilter<"Billing"> | $Enums.PaymentMethodType;
    details?: Prisma.JsonFilter<"Billing">;
    createdAt?: Prisma.DateTimeFilter<"Billing"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Billing"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type BillingOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    paymentMethod?: Prisma.SortOrder;
    details?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
};
export type BillingWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    AND?: Prisma.BillingWhereInput | Prisma.BillingWhereInput[];
    OR?: Prisma.BillingWhereInput[];
    NOT?: Prisma.BillingWhereInput | Prisma.BillingWhereInput[];
    userId?: Prisma.IntFilter<"Billing"> | number;
    paymentMethod?: Prisma.EnumPaymentMethodTypeFilter<"Billing"> | $Enums.PaymentMethodType;
    details?: Prisma.JsonFilter<"Billing">;
    createdAt?: Prisma.DateTimeFilter<"Billing"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Billing"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id">;
export type BillingOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    paymentMethod?: Prisma.SortOrder;
    details?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.BillingCountOrderByAggregateInput;
    _avg?: Prisma.BillingAvgOrderByAggregateInput;
    _max?: Prisma.BillingMaxOrderByAggregateInput;
    _min?: Prisma.BillingMinOrderByAggregateInput;
    _sum?: Prisma.BillingSumOrderByAggregateInput;
};
export type BillingScalarWhereWithAggregatesInput = {
    AND?: Prisma.BillingScalarWhereWithAggregatesInput | Prisma.BillingScalarWhereWithAggregatesInput[];
    OR?: Prisma.BillingScalarWhereWithAggregatesInput[];
    NOT?: Prisma.BillingScalarWhereWithAggregatesInput | Prisma.BillingScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"Billing"> | number;
    userId?: Prisma.IntWithAggregatesFilter<"Billing"> | number;
    paymentMethod?: Prisma.EnumPaymentMethodTypeWithAggregatesFilter<"Billing"> | $Enums.PaymentMethodType;
    details?: Prisma.JsonWithAggregatesFilter<"Billing">;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Billing"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Billing"> | Date | string;
};
export type BillingCreateInput = {
    paymentMethod: $Enums.PaymentMethodType;
    details: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutBillingsInput;
};
export type BillingUncheckedCreateInput = {
    id?: number;
    userId: number;
    paymentMethod: $Enums.PaymentMethodType;
    details: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type BillingUpdateInput = {
    paymentMethod?: Prisma.EnumPaymentMethodTypeFieldUpdateOperationsInput | $Enums.PaymentMethodType;
    details?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutBillingsNestedInput;
};
export type BillingUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
    paymentMethod?: Prisma.EnumPaymentMethodTypeFieldUpdateOperationsInput | $Enums.PaymentMethodType;
    details?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BillingCreateManyInput = {
    id?: number;
    userId: number;
    paymentMethod: $Enums.PaymentMethodType;
    details: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type BillingUpdateManyMutationInput = {
    paymentMethod?: Prisma.EnumPaymentMethodTypeFieldUpdateOperationsInput | $Enums.PaymentMethodType;
    details?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BillingUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
    paymentMethod?: Prisma.EnumPaymentMethodTypeFieldUpdateOperationsInput | $Enums.PaymentMethodType;
    details?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BillingListRelationFilter = {
    every?: Prisma.BillingWhereInput;
    some?: Prisma.BillingWhereInput;
    none?: Prisma.BillingWhereInput;
};
export type BillingOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type BillingCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    paymentMethod?: Prisma.SortOrder;
    details?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type BillingAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
};
export type BillingMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    paymentMethod?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type BillingMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    paymentMethod?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type BillingSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
};
export type BillingCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.BillingCreateWithoutUserInput, Prisma.BillingUncheckedCreateWithoutUserInput> | Prisma.BillingCreateWithoutUserInput[] | Prisma.BillingUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.BillingCreateOrConnectWithoutUserInput | Prisma.BillingCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.BillingCreateManyUserInputEnvelope;
    connect?: Prisma.BillingWhereUniqueInput | Prisma.BillingWhereUniqueInput[];
};
export type BillingUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.BillingCreateWithoutUserInput, Prisma.BillingUncheckedCreateWithoutUserInput> | Prisma.BillingCreateWithoutUserInput[] | Prisma.BillingUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.BillingCreateOrConnectWithoutUserInput | Prisma.BillingCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.BillingCreateManyUserInputEnvelope;
    connect?: Prisma.BillingWhereUniqueInput | Prisma.BillingWhereUniqueInput[];
};
export type BillingUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.BillingCreateWithoutUserInput, Prisma.BillingUncheckedCreateWithoutUserInput> | Prisma.BillingCreateWithoutUserInput[] | Prisma.BillingUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.BillingCreateOrConnectWithoutUserInput | Prisma.BillingCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.BillingUpsertWithWhereUniqueWithoutUserInput | Prisma.BillingUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.BillingCreateManyUserInputEnvelope;
    set?: Prisma.BillingWhereUniqueInput | Prisma.BillingWhereUniqueInput[];
    disconnect?: Prisma.BillingWhereUniqueInput | Prisma.BillingWhereUniqueInput[];
    delete?: Prisma.BillingWhereUniqueInput | Prisma.BillingWhereUniqueInput[];
    connect?: Prisma.BillingWhereUniqueInput | Prisma.BillingWhereUniqueInput[];
    update?: Prisma.BillingUpdateWithWhereUniqueWithoutUserInput | Prisma.BillingUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.BillingUpdateManyWithWhereWithoutUserInput | Prisma.BillingUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.BillingScalarWhereInput | Prisma.BillingScalarWhereInput[];
};
export type BillingUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.BillingCreateWithoutUserInput, Prisma.BillingUncheckedCreateWithoutUserInput> | Prisma.BillingCreateWithoutUserInput[] | Prisma.BillingUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.BillingCreateOrConnectWithoutUserInput | Prisma.BillingCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.BillingUpsertWithWhereUniqueWithoutUserInput | Prisma.BillingUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.BillingCreateManyUserInputEnvelope;
    set?: Prisma.BillingWhereUniqueInput | Prisma.BillingWhereUniqueInput[];
    disconnect?: Prisma.BillingWhereUniqueInput | Prisma.BillingWhereUniqueInput[];
    delete?: Prisma.BillingWhereUniqueInput | Prisma.BillingWhereUniqueInput[];
    connect?: Prisma.BillingWhereUniqueInput | Prisma.BillingWhereUniqueInput[];
    update?: Prisma.BillingUpdateWithWhereUniqueWithoutUserInput | Prisma.BillingUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.BillingUpdateManyWithWhereWithoutUserInput | Prisma.BillingUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.BillingScalarWhereInput | Prisma.BillingScalarWhereInput[];
};
export type EnumPaymentMethodTypeFieldUpdateOperationsInput = {
    set?: $Enums.PaymentMethodType;
};
export type BillingCreateWithoutUserInput = {
    paymentMethod: $Enums.PaymentMethodType;
    details: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type BillingUncheckedCreateWithoutUserInput = {
    id?: number;
    paymentMethod: $Enums.PaymentMethodType;
    details: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type BillingCreateOrConnectWithoutUserInput = {
    where: Prisma.BillingWhereUniqueInput;
    create: Prisma.XOR<Prisma.BillingCreateWithoutUserInput, Prisma.BillingUncheckedCreateWithoutUserInput>;
};
export type BillingCreateManyUserInputEnvelope = {
    data: Prisma.BillingCreateManyUserInput | Prisma.BillingCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type BillingUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.BillingWhereUniqueInput;
    update: Prisma.XOR<Prisma.BillingUpdateWithoutUserInput, Prisma.BillingUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.BillingCreateWithoutUserInput, Prisma.BillingUncheckedCreateWithoutUserInput>;
};
export type BillingUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.BillingWhereUniqueInput;
    data: Prisma.XOR<Prisma.BillingUpdateWithoutUserInput, Prisma.BillingUncheckedUpdateWithoutUserInput>;
};
export type BillingUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.BillingScalarWhereInput;
    data: Prisma.XOR<Prisma.BillingUpdateManyMutationInput, Prisma.BillingUncheckedUpdateManyWithoutUserInput>;
};
export type BillingScalarWhereInput = {
    AND?: Prisma.BillingScalarWhereInput | Prisma.BillingScalarWhereInput[];
    OR?: Prisma.BillingScalarWhereInput[];
    NOT?: Prisma.BillingScalarWhereInput | Prisma.BillingScalarWhereInput[];
    id?: Prisma.IntFilter<"Billing"> | number;
    userId?: Prisma.IntFilter<"Billing"> | number;
    paymentMethod?: Prisma.EnumPaymentMethodTypeFilter<"Billing"> | $Enums.PaymentMethodType;
    details?: Prisma.JsonFilter<"Billing">;
    createdAt?: Prisma.DateTimeFilter<"Billing"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Billing"> | Date | string;
};
export type BillingCreateManyUserInput = {
    id?: number;
    paymentMethod: $Enums.PaymentMethodType;
    details: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type BillingUpdateWithoutUserInput = {
    paymentMethod?: Prisma.EnumPaymentMethodTypeFieldUpdateOperationsInput | $Enums.PaymentMethodType;
    details?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BillingUncheckedUpdateWithoutUserInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    paymentMethod?: Prisma.EnumPaymentMethodTypeFieldUpdateOperationsInput | $Enums.PaymentMethodType;
    details?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BillingUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    paymentMethod?: Prisma.EnumPaymentMethodTypeFieldUpdateOperationsInput | $Enums.PaymentMethodType;
    details?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BillingSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    paymentMethod?: boolean;
    details?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["billing"]>;
export type BillingSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    paymentMethod?: boolean;
    details?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["billing"]>;
export type BillingSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    paymentMethod?: boolean;
    details?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["billing"]>;
export type BillingSelectScalar = {
    id?: boolean;
    userId?: boolean;
    paymentMethod?: boolean;
    details?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type BillingOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "paymentMethod" | "details" | "createdAt" | "updatedAt", ExtArgs["result"]["billing"]>;
export type BillingInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type BillingIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type BillingIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $BillingPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Billing";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        userId: number;
        paymentMethod: $Enums.PaymentMethodType;
        details: runtime.JsonValue;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["billing"]>;
    composites: {};
};
export type BillingGetPayload<S extends boolean | null | undefined | BillingDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$BillingPayload, S>;
export type BillingCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<BillingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: BillingCountAggregateInputType | true;
};
export interface BillingDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Billing'];
        meta: {
            name: 'Billing';
        };
    };
    findUnique<T extends BillingFindUniqueArgs>(args: Prisma.SelectSubset<T, BillingFindUniqueArgs<ExtArgs>>): Prisma.Prisma__BillingClient<runtime.Types.Result.GetResult<Prisma.$BillingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends BillingFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, BillingFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__BillingClient<runtime.Types.Result.GetResult<Prisma.$BillingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends BillingFindFirstArgs>(args?: Prisma.SelectSubset<T, BillingFindFirstArgs<ExtArgs>>): Prisma.Prisma__BillingClient<runtime.Types.Result.GetResult<Prisma.$BillingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends BillingFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, BillingFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__BillingClient<runtime.Types.Result.GetResult<Prisma.$BillingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends BillingFindManyArgs>(args?: Prisma.SelectSubset<T, BillingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BillingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends BillingCreateArgs>(args: Prisma.SelectSubset<T, BillingCreateArgs<ExtArgs>>): Prisma.Prisma__BillingClient<runtime.Types.Result.GetResult<Prisma.$BillingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends BillingCreateManyArgs>(args?: Prisma.SelectSubset<T, BillingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends BillingCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, BillingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BillingPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends BillingDeleteArgs>(args: Prisma.SelectSubset<T, BillingDeleteArgs<ExtArgs>>): Prisma.Prisma__BillingClient<runtime.Types.Result.GetResult<Prisma.$BillingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends BillingUpdateArgs>(args: Prisma.SelectSubset<T, BillingUpdateArgs<ExtArgs>>): Prisma.Prisma__BillingClient<runtime.Types.Result.GetResult<Prisma.$BillingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends BillingDeleteManyArgs>(args?: Prisma.SelectSubset<T, BillingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends BillingUpdateManyArgs>(args: Prisma.SelectSubset<T, BillingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends BillingUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, BillingUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BillingPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends BillingUpsertArgs>(args: Prisma.SelectSubset<T, BillingUpsertArgs<ExtArgs>>): Prisma.Prisma__BillingClient<runtime.Types.Result.GetResult<Prisma.$BillingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends BillingCountArgs>(args?: Prisma.Subset<T, BillingCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], BillingCountAggregateOutputType> : number>;
    aggregate<T extends BillingAggregateArgs>(args: Prisma.Subset<T, BillingAggregateArgs>): Prisma.PrismaPromise<GetBillingAggregateType<T>>;
    groupBy<T extends BillingGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: BillingGroupByArgs['orderBy'];
    } : {
        orderBy?: BillingGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, BillingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBillingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: BillingFieldRefs;
}
export interface Prisma__BillingClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface BillingFieldRefs {
    readonly id: Prisma.FieldRef<"Billing", 'Int'>;
    readonly userId: Prisma.FieldRef<"Billing", 'Int'>;
    readonly paymentMethod: Prisma.FieldRef<"Billing", 'PaymentMethodType'>;
    readonly details: Prisma.FieldRef<"Billing", 'Json'>;
    readonly createdAt: Prisma.FieldRef<"Billing", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Billing", 'DateTime'>;
}
export type BillingFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BillingSelect<ExtArgs> | null;
    omit?: Prisma.BillingOmit<ExtArgs> | null;
    include?: Prisma.BillingInclude<ExtArgs> | null;
    where: Prisma.BillingWhereUniqueInput;
};
export type BillingFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BillingSelect<ExtArgs> | null;
    omit?: Prisma.BillingOmit<ExtArgs> | null;
    include?: Prisma.BillingInclude<ExtArgs> | null;
    where: Prisma.BillingWhereUniqueInput;
};
export type BillingFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BillingSelect<ExtArgs> | null;
    omit?: Prisma.BillingOmit<ExtArgs> | null;
    include?: Prisma.BillingInclude<ExtArgs> | null;
    where?: Prisma.BillingWhereInput;
    orderBy?: Prisma.BillingOrderByWithRelationInput | Prisma.BillingOrderByWithRelationInput[];
    cursor?: Prisma.BillingWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.BillingScalarFieldEnum | Prisma.BillingScalarFieldEnum[];
};
export type BillingFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BillingSelect<ExtArgs> | null;
    omit?: Prisma.BillingOmit<ExtArgs> | null;
    include?: Prisma.BillingInclude<ExtArgs> | null;
    where?: Prisma.BillingWhereInput;
    orderBy?: Prisma.BillingOrderByWithRelationInput | Prisma.BillingOrderByWithRelationInput[];
    cursor?: Prisma.BillingWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.BillingScalarFieldEnum | Prisma.BillingScalarFieldEnum[];
};
export type BillingFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BillingSelect<ExtArgs> | null;
    omit?: Prisma.BillingOmit<ExtArgs> | null;
    include?: Prisma.BillingInclude<ExtArgs> | null;
    where?: Prisma.BillingWhereInput;
    orderBy?: Prisma.BillingOrderByWithRelationInput | Prisma.BillingOrderByWithRelationInput[];
    cursor?: Prisma.BillingWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.BillingScalarFieldEnum | Prisma.BillingScalarFieldEnum[];
};
export type BillingCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BillingSelect<ExtArgs> | null;
    omit?: Prisma.BillingOmit<ExtArgs> | null;
    include?: Prisma.BillingInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.BillingCreateInput, Prisma.BillingUncheckedCreateInput>;
};
export type BillingCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.BillingCreateManyInput | Prisma.BillingCreateManyInput[];
    skipDuplicates?: boolean;
};
export type BillingCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BillingSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.BillingOmit<ExtArgs> | null;
    data: Prisma.BillingCreateManyInput | Prisma.BillingCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.BillingIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type BillingUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BillingSelect<ExtArgs> | null;
    omit?: Prisma.BillingOmit<ExtArgs> | null;
    include?: Prisma.BillingInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.BillingUpdateInput, Prisma.BillingUncheckedUpdateInput>;
    where: Prisma.BillingWhereUniqueInput;
};
export type BillingUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.BillingUpdateManyMutationInput, Prisma.BillingUncheckedUpdateManyInput>;
    where?: Prisma.BillingWhereInput;
    limit?: number;
};
export type BillingUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BillingSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.BillingOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.BillingUpdateManyMutationInput, Prisma.BillingUncheckedUpdateManyInput>;
    where?: Prisma.BillingWhereInput;
    limit?: number;
    include?: Prisma.BillingIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type BillingUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BillingSelect<ExtArgs> | null;
    omit?: Prisma.BillingOmit<ExtArgs> | null;
    include?: Prisma.BillingInclude<ExtArgs> | null;
    where: Prisma.BillingWhereUniqueInput;
    create: Prisma.XOR<Prisma.BillingCreateInput, Prisma.BillingUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.BillingUpdateInput, Prisma.BillingUncheckedUpdateInput>;
};
export type BillingDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BillingSelect<ExtArgs> | null;
    omit?: Prisma.BillingOmit<ExtArgs> | null;
    include?: Prisma.BillingInclude<ExtArgs> | null;
    where: Prisma.BillingWhereUniqueInput;
};
export type BillingDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BillingWhereInput;
    limit?: number;
};
export type BillingDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BillingSelect<ExtArgs> | null;
    omit?: Prisma.BillingOmit<ExtArgs> | null;
    include?: Prisma.BillingInclude<ExtArgs> | null;
};
export {};
