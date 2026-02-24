import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type OrderOnJurisdictionModel = runtime.Types.Result.DefaultSelection<Prisma.$OrderOnJurisdictionPayload>;
export type AggregateOrderOnJurisdiction = {
    _count: OrderOnJurisdictionCountAggregateOutputType | null;
    _avg: OrderOnJurisdictionAvgAggregateOutputType | null;
    _sum: OrderOnJurisdictionSumAggregateOutputType | null;
    _min: OrderOnJurisdictionMinAggregateOutputType | null;
    _max: OrderOnJurisdictionMaxAggregateOutputType | null;
};
export type OrderOnJurisdictionAvgAggregateOutputType = {
    order_id: number | null;
    jurisdiction_id: number | null;
};
export type OrderOnJurisdictionSumAggregateOutputType = {
    order_id: number | null;
    jurisdiction_id: number | null;
};
export type OrderOnJurisdictionMinAggregateOutputType = {
    order_id: number | null;
    jurisdiction_id: number | null;
};
export type OrderOnJurisdictionMaxAggregateOutputType = {
    order_id: number | null;
    jurisdiction_id: number | null;
};
export type OrderOnJurisdictionCountAggregateOutputType = {
    order_id: number;
    jurisdiction_id: number;
    _all: number;
};
export type OrderOnJurisdictionAvgAggregateInputType = {
    order_id?: true;
    jurisdiction_id?: true;
};
export type OrderOnJurisdictionSumAggregateInputType = {
    order_id?: true;
    jurisdiction_id?: true;
};
export type OrderOnJurisdictionMinAggregateInputType = {
    order_id?: true;
    jurisdiction_id?: true;
};
export type OrderOnJurisdictionMaxAggregateInputType = {
    order_id?: true;
    jurisdiction_id?: true;
};
export type OrderOnJurisdictionCountAggregateInputType = {
    order_id?: true;
    jurisdiction_id?: true;
    _all?: true;
};
export type OrderOnJurisdictionAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OrderOnJurisdictionWhereInput;
    orderBy?: Prisma.OrderOnJurisdictionOrderByWithRelationInput | Prisma.OrderOnJurisdictionOrderByWithRelationInput[];
    cursor?: Prisma.OrderOnJurisdictionWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | OrderOnJurisdictionCountAggregateInputType;
    _avg?: OrderOnJurisdictionAvgAggregateInputType;
    _sum?: OrderOnJurisdictionSumAggregateInputType;
    _min?: OrderOnJurisdictionMinAggregateInputType;
    _max?: OrderOnJurisdictionMaxAggregateInputType;
};
export type GetOrderOnJurisdictionAggregateType<T extends OrderOnJurisdictionAggregateArgs> = {
    [P in keyof T & keyof AggregateOrderOnJurisdiction]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateOrderOnJurisdiction[P]> : Prisma.GetScalarType<T[P], AggregateOrderOnJurisdiction[P]>;
};
export type OrderOnJurisdictionGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OrderOnJurisdictionWhereInput;
    orderBy?: Prisma.OrderOnJurisdictionOrderByWithAggregationInput | Prisma.OrderOnJurisdictionOrderByWithAggregationInput[];
    by: Prisma.OrderOnJurisdictionScalarFieldEnum[] | Prisma.OrderOnJurisdictionScalarFieldEnum;
    having?: Prisma.OrderOnJurisdictionScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: OrderOnJurisdictionCountAggregateInputType | true;
    _avg?: OrderOnJurisdictionAvgAggregateInputType;
    _sum?: OrderOnJurisdictionSumAggregateInputType;
    _min?: OrderOnJurisdictionMinAggregateInputType;
    _max?: OrderOnJurisdictionMaxAggregateInputType;
};
export type OrderOnJurisdictionGroupByOutputType = {
    order_id: number;
    jurisdiction_id: number;
    _count: OrderOnJurisdictionCountAggregateOutputType | null;
    _avg: OrderOnJurisdictionAvgAggregateOutputType | null;
    _sum: OrderOnJurisdictionSumAggregateOutputType | null;
    _min: OrderOnJurisdictionMinAggregateOutputType | null;
    _max: OrderOnJurisdictionMaxAggregateOutputType | null;
};
type GetOrderOnJurisdictionGroupByPayload<T extends OrderOnJurisdictionGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<OrderOnJurisdictionGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof OrderOnJurisdictionGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], OrderOnJurisdictionGroupByOutputType[P]> : Prisma.GetScalarType<T[P], OrderOnJurisdictionGroupByOutputType[P]>;
}>>;
export type OrderOnJurisdictionWhereInput = {
    AND?: Prisma.OrderOnJurisdictionWhereInput | Prisma.OrderOnJurisdictionWhereInput[];
    OR?: Prisma.OrderOnJurisdictionWhereInput[];
    NOT?: Prisma.OrderOnJurisdictionWhereInput | Prisma.OrderOnJurisdictionWhereInput[];
    order_id?: Prisma.IntFilter<"OrderOnJurisdiction"> | number;
    jurisdiction_id?: Prisma.IntFilter<"OrderOnJurisdiction"> | number;
    jurisdiction?: Prisma.XOR<Prisma.JurisdictionScalarRelationFilter, Prisma.JurisdictionWhereInput>;
    order?: Prisma.XOR<Prisma.OrderScalarRelationFilter, Prisma.OrderWhereInput>;
};
export type OrderOnJurisdictionOrderByWithRelationInput = {
    order_id?: Prisma.SortOrder;
    jurisdiction_id?: Prisma.SortOrder;
    jurisdiction?: Prisma.JurisdictionOrderByWithRelationInput;
    order?: Prisma.OrderOrderByWithRelationInput;
};
export type OrderOnJurisdictionWhereUniqueInput = Prisma.AtLeast<{
    order_id_jurisdiction_id?: Prisma.OrderOnJurisdictionOrder_idJurisdiction_idCompoundUniqueInput;
    AND?: Prisma.OrderOnJurisdictionWhereInput | Prisma.OrderOnJurisdictionWhereInput[];
    OR?: Prisma.OrderOnJurisdictionWhereInput[];
    NOT?: Prisma.OrderOnJurisdictionWhereInput | Prisma.OrderOnJurisdictionWhereInput[];
    order_id?: Prisma.IntFilter<"OrderOnJurisdiction"> | number;
    jurisdiction_id?: Prisma.IntFilter<"OrderOnJurisdiction"> | number;
    jurisdiction?: Prisma.XOR<Prisma.JurisdictionScalarRelationFilter, Prisma.JurisdictionWhereInput>;
    order?: Prisma.XOR<Prisma.OrderScalarRelationFilter, Prisma.OrderWhereInput>;
}, "order_id_jurisdiction_id">;
export type OrderOnJurisdictionOrderByWithAggregationInput = {
    order_id?: Prisma.SortOrder;
    jurisdiction_id?: Prisma.SortOrder;
    _count?: Prisma.OrderOnJurisdictionCountOrderByAggregateInput;
    _avg?: Prisma.OrderOnJurisdictionAvgOrderByAggregateInput;
    _max?: Prisma.OrderOnJurisdictionMaxOrderByAggregateInput;
    _min?: Prisma.OrderOnJurisdictionMinOrderByAggregateInput;
    _sum?: Prisma.OrderOnJurisdictionSumOrderByAggregateInput;
};
export type OrderOnJurisdictionScalarWhereWithAggregatesInput = {
    AND?: Prisma.OrderOnJurisdictionScalarWhereWithAggregatesInput | Prisma.OrderOnJurisdictionScalarWhereWithAggregatesInput[];
    OR?: Prisma.OrderOnJurisdictionScalarWhereWithAggregatesInput[];
    NOT?: Prisma.OrderOnJurisdictionScalarWhereWithAggregatesInput | Prisma.OrderOnJurisdictionScalarWhereWithAggregatesInput[];
    order_id?: Prisma.IntWithAggregatesFilter<"OrderOnJurisdiction"> | number;
    jurisdiction_id?: Prisma.IntWithAggregatesFilter<"OrderOnJurisdiction"> | number;
};
export type OrderOnJurisdictionCreateInput = {
    jurisdiction: Prisma.JurisdictionCreateNestedOneWithoutOrdersInput;
    order: Prisma.OrderCreateNestedOneWithoutJurisdictionsInput;
};
export type OrderOnJurisdictionUncheckedCreateInput = {
    order_id: number;
    jurisdiction_id: number;
};
export type OrderOnJurisdictionUpdateInput = {
    jurisdiction?: Prisma.JurisdictionUpdateOneRequiredWithoutOrdersNestedInput;
    order?: Prisma.OrderUpdateOneRequiredWithoutJurisdictionsNestedInput;
};
export type OrderOnJurisdictionUncheckedUpdateInput = {
    order_id?: Prisma.IntFieldUpdateOperationsInput | number;
    jurisdiction_id?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type OrderOnJurisdictionCreateManyInput = {
    order_id: number;
    jurisdiction_id: number;
};
export type OrderOnJurisdictionUpdateManyMutationInput = {};
export type OrderOnJurisdictionUncheckedUpdateManyInput = {
    order_id?: Prisma.IntFieldUpdateOperationsInput | number;
    jurisdiction_id?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type OrderOnJurisdictionListRelationFilter = {
    every?: Prisma.OrderOnJurisdictionWhereInput;
    some?: Prisma.OrderOnJurisdictionWhereInput;
    none?: Prisma.OrderOnJurisdictionWhereInput;
};
export type OrderOnJurisdictionOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type OrderOnJurisdictionOrder_idJurisdiction_idCompoundUniqueInput = {
    order_id: number;
    jurisdiction_id: number;
};
export type OrderOnJurisdictionCountOrderByAggregateInput = {
    order_id?: Prisma.SortOrder;
    jurisdiction_id?: Prisma.SortOrder;
};
export type OrderOnJurisdictionAvgOrderByAggregateInput = {
    order_id?: Prisma.SortOrder;
    jurisdiction_id?: Prisma.SortOrder;
};
export type OrderOnJurisdictionMaxOrderByAggregateInput = {
    order_id?: Prisma.SortOrder;
    jurisdiction_id?: Prisma.SortOrder;
};
export type OrderOnJurisdictionMinOrderByAggregateInput = {
    order_id?: Prisma.SortOrder;
    jurisdiction_id?: Prisma.SortOrder;
};
export type OrderOnJurisdictionSumOrderByAggregateInput = {
    order_id?: Prisma.SortOrder;
    jurisdiction_id?: Prisma.SortOrder;
};
export type OrderOnJurisdictionCreateNestedManyWithoutOrderInput = {
    create?: Prisma.XOR<Prisma.OrderOnJurisdictionCreateWithoutOrderInput, Prisma.OrderOnJurisdictionUncheckedCreateWithoutOrderInput> | Prisma.OrderOnJurisdictionCreateWithoutOrderInput[] | Prisma.OrderOnJurisdictionUncheckedCreateWithoutOrderInput[];
    connectOrCreate?: Prisma.OrderOnJurisdictionCreateOrConnectWithoutOrderInput | Prisma.OrderOnJurisdictionCreateOrConnectWithoutOrderInput[];
    createMany?: Prisma.OrderOnJurisdictionCreateManyOrderInputEnvelope;
    connect?: Prisma.OrderOnJurisdictionWhereUniqueInput | Prisma.OrderOnJurisdictionWhereUniqueInput[];
};
export type OrderOnJurisdictionUncheckedCreateNestedManyWithoutOrderInput = {
    create?: Prisma.XOR<Prisma.OrderOnJurisdictionCreateWithoutOrderInput, Prisma.OrderOnJurisdictionUncheckedCreateWithoutOrderInput> | Prisma.OrderOnJurisdictionCreateWithoutOrderInput[] | Prisma.OrderOnJurisdictionUncheckedCreateWithoutOrderInput[];
    connectOrCreate?: Prisma.OrderOnJurisdictionCreateOrConnectWithoutOrderInput | Prisma.OrderOnJurisdictionCreateOrConnectWithoutOrderInput[];
    createMany?: Prisma.OrderOnJurisdictionCreateManyOrderInputEnvelope;
    connect?: Prisma.OrderOnJurisdictionWhereUniqueInput | Prisma.OrderOnJurisdictionWhereUniqueInput[];
};
export type OrderOnJurisdictionUpdateManyWithoutOrderNestedInput = {
    create?: Prisma.XOR<Prisma.OrderOnJurisdictionCreateWithoutOrderInput, Prisma.OrderOnJurisdictionUncheckedCreateWithoutOrderInput> | Prisma.OrderOnJurisdictionCreateWithoutOrderInput[] | Prisma.OrderOnJurisdictionUncheckedCreateWithoutOrderInput[];
    connectOrCreate?: Prisma.OrderOnJurisdictionCreateOrConnectWithoutOrderInput | Prisma.OrderOnJurisdictionCreateOrConnectWithoutOrderInput[];
    upsert?: Prisma.OrderOnJurisdictionUpsertWithWhereUniqueWithoutOrderInput | Prisma.OrderOnJurisdictionUpsertWithWhereUniqueWithoutOrderInput[];
    createMany?: Prisma.OrderOnJurisdictionCreateManyOrderInputEnvelope;
    set?: Prisma.OrderOnJurisdictionWhereUniqueInput | Prisma.OrderOnJurisdictionWhereUniqueInput[];
    disconnect?: Prisma.OrderOnJurisdictionWhereUniqueInput | Prisma.OrderOnJurisdictionWhereUniqueInput[];
    delete?: Prisma.OrderOnJurisdictionWhereUniqueInput | Prisma.OrderOnJurisdictionWhereUniqueInput[];
    connect?: Prisma.OrderOnJurisdictionWhereUniqueInput | Prisma.OrderOnJurisdictionWhereUniqueInput[];
    update?: Prisma.OrderOnJurisdictionUpdateWithWhereUniqueWithoutOrderInput | Prisma.OrderOnJurisdictionUpdateWithWhereUniqueWithoutOrderInput[];
    updateMany?: Prisma.OrderOnJurisdictionUpdateManyWithWhereWithoutOrderInput | Prisma.OrderOnJurisdictionUpdateManyWithWhereWithoutOrderInput[];
    deleteMany?: Prisma.OrderOnJurisdictionScalarWhereInput | Prisma.OrderOnJurisdictionScalarWhereInput[];
};
export type OrderOnJurisdictionUncheckedUpdateManyWithoutOrderNestedInput = {
    create?: Prisma.XOR<Prisma.OrderOnJurisdictionCreateWithoutOrderInput, Prisma.OrderOnJurisdictionUncheckedCreateWithoutOrderInput> | Prisma.OrderOnJurisdictionCreateWithoutOrderInput[] | Prisma.OrderOnJurisdictionUncheckedCreateWithoutOrderInput[];
    connectOrCreate?: Prisma.OrderOnJurisdictionCreateOrConnectWithoutOrderInput | Prisma.OrderOnJurisdictionCreateOrConnectWithoutOrderInput[];
    upsert?: Prisma.OrderOnJurisdictionUpsertWithWhereUniqueWithoutOrderInput | Prisma.OrderOnJurisdictionUpsertWithWhereUniqueWithoutOrderInput[];
    createMany?: Prisma.OrderOnJurisdictionCreateManyOrderInputEnvelope;
    set?: Prisma.OrderOnJurisdictionWhereUniqueInput | Prisma.OrderOnJurisdictionWhereUniqueInput[];
    disconnect?: Prisma.OrderOnJurisdictionWhereUniqueInput | Prisma.OrderOnJurisdictionWhereUniqueInput[];
    delete?: Prisma.OrderOnJurisdictionWhereUniqueInput | Prisma.OrderOnJurisdictionWhereUniqueInput[];
    connect?: Prisma.OrderOnJurisdictionWhereUniqueInput | Prisma.OrderOnJurisdictionWhereUniqueInput[];
    update?: Prisma.OrderOnJurisdictionUpdateWithWhereUniqueWithoutOrderInput | Prisma.OrderOnJurisdictionUpdateWithWhereUniqueWithoutOrderInput[];
    updateMany?: Prisma.OrderOnJurisdictionUpdateManyWithWhereWithoutOrderInput | Prisma.OrderOnJurisdictionUpdateManyWithWhereWithoutOrderInput[];
    deleteMany?: Prisma.OrderOnJurisdictionScalarWhereInput | Prisma.OrderOnJurisdictionScalarWhereInput[];
};
export type OrderOnJurisdictionCreateNestedManyWithoutJurisdictionInput = {
    create?: Prisma.XOR<Prisma.OrderOnJurisdictionCreateWithoutJurisdictionInput, Prisma.OrderOnJurisdictionUncheckedCreateWithoutJurisdictionInput> | Prisma.OrderOnJurisdictionCreateWithoutJurisdictionInput[] | Prisma.OrderOnJurisdictionUncheckedCreateWithoutJurisdictionInput[];
    connectOrCreate?: Prisma.OrderOnJurisdictionCreateOrConnectWithoutJurisdictionInput | Prisma.OrderOnJurisdictionCreateOrConnectWithoutJurisdictionInput[];
    createMany?: Prisma.OrderOnJurisdictionCreateManyJurisdictionInputEnvelope;
    connect?: Prisma.OrderOnJurisdictionWhereUniqueInput | Prisma.OrderOnJurisdictionWhereUniqueInput[];
};
export type OrderOnJurisdictionUncheckedCreateNestedManyWithoutJurisdictionInput = {
    create?: Prisma.XOR<Prisma.OrderOnJurisdictionCreateWithoutJurisdictionInput, Prisma.OrderOnJurisdictionUncheckedCreateWithoutJurisdictionInput> | Prisma.OrderOnJurisdictionCreateWithoutJurisdictionInput[] | Prisma.OrderOnJurisdictionUncheckedCreateWithoutJurisdictionInput[];
    connectOrCreate?: Prisma.OrderOnJurisdictionCreateOrConnectWithoutJurisdictionInput | Prisma.OrderOnJurisdictionCreateOrConnectWithoutJurisdictionInput[];
    createMany?: Prisma.OrderOnJurisdictionCreateManyJurisdictionInputEnvelope;
    connect?: Prisma.OrderOnJurisdictionWhereUniqueInput | Prisma.OrderOnJurisdictionWhereUniqueInput[];
};
export type OrderOnJurisdictionUpdateManyWithoutJurisdictionNestedInput = {
    create?: Prisma.XOR<Prisma.OrderOnJurisdictionCreateWithoutJurisdictionInput, Prisma.OrderOnJurisdictionUncheckedCreateWithoutJurisdictionInput> | Prisma.OrderOnJurisdictionCreateWithoutJurisdictionInput[] | Prisma.OrderOnJurisdictionUncheckedCreateWithoutJurisdictionInput[];
    connectOrCreate?: Prisma.OrderOnJurisdictionCreateOrConnectWithoutJurisdictionInput | Prisma.OrderOnJurisdictionCreateOrConnectWithoutJurisdictionInput[];
    upsert?: Prisma.OrderOnJurisdictionUpsertWithWhereUniqueWithoutJurisdictionInput | Prisma.OrderOnJurisdictionUpsertWithWhereUniqueWithoutJurisdictionInput[];
    createMany?: Prisma.OrderOnJurisdictionCreateManyJurisdictionInputEnvelope;
    set?: Prisma.OrderOnJurisdictionWhereUniqueInput | Prisma.OrderOnJurisdictionWhereUniqueInput[];
    disconnect?: Prisma.OrderOnJurisdictionWhereUniqueInput | Prisma.OrderOnJurisdictionWhereUniqueInput[];
    delete?: Prisma.OrderOnJurisdictionWhereUniqueInput | Prisma.OrderOnJurisdictionWhereUniqueInput[];
    connect?: Prisma.OrderOnJurisdictionWhereUniqueInput | Prisma.OrderOnJurisdictionWhereUniqueInput[];
    update?: Prisma.OrderOnJurisdictionUpdateWithWhereUniqueWithoutJurisdictionInput | Prisma.OrderOnJurisdictionUpdateWithWhereUniqueWithoutJurisdictionInput[];
    updateMany?: Prisma.OrderOnJurisdictionUpdateManyWithWhereWithoutJurisdictionInput | Prisma.OrderOnJurisdictionUpdateManyWithWhereWithoutJurisdictionInput[];
    deleteMany?: Prisma.OrderOnJurisdictionScalarWhereInput | Prisma.OrderOnJurisdictionScalarWhereInput[];
};
export type OrderOnJurisdictionUncheckedUpdateManyWithoutJurisdictionNestedInput = {
    create?: Prisma.XOR<Prisma.OrderOnJurisdictionCreateWithoutJurisdictionInput, Prisma.OrderOnJurisdictionUncheckedCreateWithoutJurisdictionInput> | Prisma.OrderOnJurisdictionCreateWithoutJurisdictionInput[] | Prisma.OrderOnJurisdictionUncheckedCreateWithoutJurisdictionInput[];
    connectOrCreate?: Prisma.OrderOnJurisdictionCreateOrConnectWithoutJurisdictionInput | Prisma.OrderOnJurisdictionCreateOrConnectWithoutJurisdictionInput[];
    upsert?: Prisma.OrderOnJurisdictionUpsertWithWhereUniqueWithoutJurisdictionInput | Prisma.OrderOnJurisdictionUpsertWithWhereUniqueWithoutJurisdictionInput[];
    createMany?: Prisma.OrderOnJurisdictionCreateManyJurisdictionInputEnvelope;
    set?: Prisma.OrderOnJurisdictionWhereUniqueInput | Prisma.OrderOnJurisdictionWhereUniqueInput[];
    disconnect?: Prisma.OrderOnJurisdictionWhereUniqueInput | Prisma.OrderOnJurisdictionWhereUniqueInput[];
    delete?: Prisma.OrderOnJurisdictionWhereUniqueInput | Prisma.OrderOnJurisdictionWhereUniqueInput[];
    connect?: Prisma.OrderOnJurisdictionWhereUniqueInput | Prisma.OrderOnJurisdictionWhereUniqueInput[];
    update?: Prisma.OrderOnJurisdictionUpdateWithWhereUniqueWithoutJurisdictionInput | Prisma.OrderOnJurisdictionUpdateWithWhereUniqueWithoutJurisdictionInput[];
    updateMany?: Prisma.OrderOnJurisdictionUpdateManyWithWhereWithoutJurisdictionInput | Prisma.OrderOnJurisdictionUpdateManyWithWhereWithoutJurisdictionInput[];
    deleteMany?: Prisma.OrderOnJurisdictionScalarWhereInput | Prisma.OrderOnJurisdictionScalarWhereInput[];
};
export type OrderOnJurisdictionCreateWithoutOrderInput = {
    jurisdiction: Prisma.JurisdictionCreateNestedOneWithoutOrdersInput;
};
export type OrderOnJurisdictionUncheckedCreateWithoutOrderInput = {
    jurisdiction_id: number;
};
export type OrderOnJurisdictionCreateOrConnectWithoutOrderInput = {
    where: Prisma.OrderOnJurisdictionWhereUniqueInput;
    create: Prisma.XOR<Prisma.OrderOnJurisdictionCreateWithoutOrderInput, Prisma.OrderOnJurisdictionUncheckedCreateWithoutOrderInput>;
};
export type OrderOnJurisdictionCreateManyOrderInputEnvelope = {
    data: Prisma.OrderOnJurisdictionCreateManyOrderInput | Prisma.OrderOnJurisdictionCreateManyOrderInput[];
    skipDuplicates?: boolean;
};
export type OrderOnJurisdictionUpsertWithWhereUniqueWithoutOrderInput = {
    where: Prisma.OrderOnJurisdictionWhereUniqueInput;
    update: Prisma.XOR<Prisma.OrderOnJurisdictionUpdateWithoutOrderInput, Prisma.OrderOnJurisdictionUncheckedUpdateWithoutOrderInput>;
    create: Prisma.XOR<Prisma.OrderOnJurisdictionCreateWithoutOrderInput, Prisma.OrderOnJurisdictionUncheckedCreateWithoutOrderInput>;
};
export type OrderOnJurisdictionUpdateWithWhereUniqueWithoutOrderInput = {
    where: Prisma.OrderOnJurisdictionWhereUniqueInput;
    data: Prisma.XOR<Prisma.OrderOnJurisdictionUpdateWithoutOrderInput, Prisma.OrderOnJurisdictionUncheckedUpdateWithoutOrderInput>;
};
export type OrderOnJurisdictionUpdateManyWithWhereWithoutOrderInput = {
    where: Prisma.OrderOnJurisdictionScalarWhereInput;
    data: Prisma.XOR<Prisma.OrderOnJurisdictionUpdateManyMutationInput, Prisma.OrderOnJurisdictionUncheckedUpdateManyWithoutOrderInput>;
};
export type OrderOnJurisdictionScalarWhereInput = {
    AND?: Prisma.OrderOnJurisdictionScalarWhereInput | Prisma.OrderOnJurisdictionScalarWhereInput[];
    OR?: Prisma.OrderOnJurisdictionScalarWhereInput[];
    NOT?: Prisma.OrderOnJurisdictionScalarWhereInput | Prisma.OrderOnJurisdictionScalarWhereInput[];
    order_id?: Prisma.IntFilter<"OrderOnJurisdiction"> | number;
    jurisdiction_id?: Prisma.IntFilter<"OrderOnJurisdiction"> | number;
};
export type OrderOnJurisdictionCreateWithoutJurisdictionInput = {
    order: Prisma.OrderCreateNestedOneWithoutJurisdictionsInput;
};
export type OrderOnJurisdictionUncheckedCreateWithoutJurisdictionInput = {
    order_id: number;
};
export type OrderOnJurisdictionCreateOrConnectWithoutJurisdictionInput = {
    where: Prisma.OrderOnJurisdictionWhereUniqueInput;
    create: Prisma.XOR<Prisma.OrderOnJurisdictionCreateWithoutJurisdictionInput, Prisma.OrderOnJurisdictionUncheckedCreateWithoutJurisdictionInput>;
};
export type OrderOnJurisdictionCreateManyJurisdictionInputEnvelope = {
    data: Prisma.OrderOnJurisdictionCreateManyJurisdictionInput | Prisma.OrderOnJurisdictionCreateManyJurisdictionInput[];
    skipDuplicates?: boolean;
};
export type OrderOnJurisdictionUpsertWithWhereUniqueWithoutJurisdictionInput = {
    where: Prisma.OrderOnJurisdictionWhereUniqueInput;
    update: Prisma.XOR<Prisma.OrderOnJurisdictionUpdateWithoutJurisdictionInput, Prisma.OrderOnJurisdictionUncheckedUpdateWithoutJurisdictionInput>;
    create: Prisma.XOR<Prisma.OrderOnJurisdictionCreateWithoutJurisdictionInput, Prisma.OrderOnJurisdictionUncheckedCreateWithoutJurisdictionInput>;
};
export type OrderOnJurisdictionUpdateWithWhereUniqueWithoutJurisdictionInput = {
    where: Prisma.OrderOnJurisdictionWhereUniqueInput;
    data: Prisma.XOR<Prisma.OrderOnJurisdictionUpdateWithoutJurisdictionInput, Prisma.OrderOnJurisdictionUncheckedUpdateWithoutJurisdictionInput>;
};
export type OrderOnJurisdictionUpdateManyWithWhereWithoutJurisdictionInput = {
    where: Prisma.OrderOnJurisdictionScalarWhereInput;
    data: Prisma.XOR<Prisma.OrderOnJurisdictionUpdateManyMutationInput, Prisma.OrderOnJurisdictionUncheckedUpdateManyWithoutJurisdictionInput>;
};
export type OrderOnJurisdictionCreateManyOrderInput = {
    jurisdiction_id: number;
};
export type OrderOnJurisdictionUpdateWithoutOrderInput = {
    jurisdiction?: Prisma.JurisdictionUpdateOneRequiredWithoutOrdersNestedInput;
};
export type OrderOnJurisdictionUncheckedUpdateWithoutOrderInput = {
    jurisdiction_id?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type OrderOnJurisdictionUncheckedUpdateManyWithoutOrderInput = {
    jurisdiction_id?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type OrderOnJurisdictionCreateManyJurisdictionInput = {
    order_id: number;
};
export type OrderOnJurisdictionUpdateWithoutJurisdictionInput = {
    order?: Prisma.OrderUpdateOneRequiredWithoutJurisdictionsNestedInput;
};
export type OrderOnJurisdictionUncheckedUpdateWithoutJurisdictionInput = {
    order_id?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type OrderOnJurisdictionUncheckedUpdateManyWithoutJurisdictionInput = {
    order_id?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type OrderOnJurisdictionSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    order_id?: boolean;
    jurisdiction_id?: boolean;
    jurisdiction?: boolean | Prisma.JurisdictionDefaultArgs<ExtArgs>;
    order?: boolean | Prisma.OrderDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["orderOnJurisdiction"]>;
export type OrderOnJurisdictionSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    order_id?: boolean;
    jurisdiction_id?: boolean;
    jurisdiction?: boolean | Prisma.JurisdictionDefaultArgs<ExtArgs>;
    order?: boolean | Prisma.OrderDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["orderOnJurisdiction"]>;
export type OrderOnJurisdictionSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    order_id?: boolean;
    jurisdiction_id?: boolean;
    jurisdiction?: boolean | Prisma.JurisdictionDefaultArgs<ExtArgs>;
    order?: boolean | Prisma.OrderDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["orderOnJurisdiction"]>;
export type OrderOnJurisdictionSelectScalar = {
    order_id?: boolean;
    jurisdiction_id?: boolean;
};
export type OrderOnJurisdictionOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"order_id" | "jurisdiction_id", ExtArgs["result"]["orderOnJurisdiction"]>;
export type OrderOnJurisdictionInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    jurisdiction?: boolean | Prisma.JurisdictionDefaultArgs<ExtArgs>;
    order?: boolean | Prisma.OrderDefaultArgs<ExtArgs>;
};
export type OrderOnJurisdictionIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    jurisdiction?: boolean | Prisma.JurisdictionDefaultArgs<ExtArgs>;
    order?: boolean | Prisma.OrderDefaultArgs<ExtArgs>;
};
export type OrderOnJurisdictionIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    jurisdiction?: boolean | Prisma.JurisdictionDefaultArgs<ExtArgs>;
    order?: boolean | Prisma.OrderDefaultArgs<ExtArgs>;
};
export type $OrderOnJurisdictionPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "OrderOnJurisdiction";
    objects: {
        jurisdiction: Prisma.$JurisdictionPayload<ExtArgs>;
        order: Prisma.$OrderPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        order_id: number;
        jurisdiction_id: number;
    }, ExtArgs["result"]["orderOnJurisdiction"]>;
    composites: {};
};
export type OrderOnJurisdictionGetPayload<S extends boolean | null | undefined | OrderOnJurisdictionDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$OrderOnJurisdictionPayload, S>;
export type OrderOnJurisdictionCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<OrderOnJurisdictionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: OrderOnJurisdictionCountAggregateInputType | true;
};
export interface OrderOnJurisdictionDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['OrderOnJurisdiction'];
        meta: {
            name: 'OrderOnJurisdiction';
        };
    };
    findUnique<T extends OrderOnJurisdictionFindUniqueArgs>(args: Prisma.SelectSubset<T, OrderOnJurisdictionFindUniqueArgs<ExtArgs>>): Prisma.Prisma__OrderOnJurisdictionClient<runtime.Types.Result.GetResult<Prisma.$OrderOnJurisdictionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends OrderOnJurisdictionFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, OrderOnJurisdictionFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__OrderOnJurisdictionClient<runtime.Types.Result.GetResult<Prisma.$OrderOnJurisdictionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends OrderOnJurisdictionFindFirstArgs>(args?: Prisma.SelectSubset<T, OrderOnJurisdictionFindFirstArgs<ExtArgs>>): Prisma.Prisma__OrderOnJurisdictionClient<runtime.Types.Result.GetResult<Prisma.$OrderOnJurisdictionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends OrderOnJurisdictionFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, OrderOnJurisdictionFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__OrderOnJurisdictionClient<runtime.Types.Result.GetResult<Prisma.$OrderOnJurisdictionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends OrderOnJurisdictionFindManyArgs>(args?: Prisma.SelectSubset<T, OrderOnJurisdictionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OrderOnJurisdictionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends OrderOnJurisdictionCreateArgs>(args: Prisma.SelectSubset<T, OrderOnJurisdictionCreateArgs<ExtArgs>>): Prisma.Prisma__OrderOnJurisdictionClient<runtime.Types.Result.GetResult<Prisma.$OrderOnJurisdictionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends OrderOnJurisdictionCreateManyArgs>(args?: Prisma.SelectSubset<T, OrderOnJurisdictionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends OrderOnJurisdictionCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, OrderOnJurisdictionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OrderOnJurisdictionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends OrderOnJurisdictionDeleteArgs>(args: Prisma.SelectSubset<T, OrderOnJurisdictionDeleteArgs<ExtArgs>>): Prisma.Prisma__OrderOnJurisdictionClient<runtime.Types.Result.GetResult<Prisma.$OrderOnJurisdictionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends OrderOnJurisdictionUpdateArgs>(args: Prisma.SelectSubset<T, OrderOnJurisdictionUpdateArgs<ExtArgs>>): Prisma.Prisma__OrderOnJurisdictionClient<runtime.Types.Result.GetResult<Prisma.$OrderOnJurisdictionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends OrderOnJurisdictionDeleteManyArgs>(args?: Prisma.SelectSubset<T, OrderOnJurisdictionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends OrderOnJurisdictionUpdateManyArgs>(args: Prisma.SelectSubset<T, OrderOnJurisdictionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends OrderOnJurisdictionUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, OrderOnJurisdictionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OrderOnJurisdictionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends OrderOnJurisdictionUpsertArgs>(args: Prisma.SelectSubset<T, OrderOnJurisdictionUpsertArgs<ExtArgs>>): Prisma.Prisma__OrderOnJurisdictionClient<runtime.Types.Result.GetResult<Prisma.$OrderOnJurisdictionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends OrderOnJurisdictionCountArgs>(args?: Prisma.Subset<T, OrderOnJurisdictionCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], OrderOnJurisdictionCountAggregateOutputType> : number>;
    aggregate<T extends OrderOnJurisdictionAggregateArgs>(args: Prisma.Subset<T, OrderOnJurisdictionAggregateArgs>): Prisma.PrismaPromise<GetOrderOnJurisdictionAggregateType<T>>;
    groupBy<T extends OrderOnJurisdictionGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: OrderOnJurisdictionGroupByArgs['orderBy'];
    } : {
        orderBy?: OrderOnJurisdictionGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, OrderOnJurisdictionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrderOnJurisdictionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: OrderOnJurisdictionFieldRefs;
}
export interface Prisma__OrderOnJurisdictionClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    jurisdiction<T extends Prisma.JurisdictionDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.JurisdictionDefaultArgs<ExtArgs>>): Prisma.Prisma__JurisdictionClient<runtime.Types.Result.GetResult<Prisma.$JurisdictionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    order<T extends Prisma.OrderDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.OrderDefaultArgs<ExtArgs>>): Prisma.Prisma__OrderClient<runtime.Types.Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface OrderOnJurisdictionFieldRefs {
    readonly order_id: Prisma.FieldRef<"OrderOnJurisdiction", 'Int'>;
    readonly jurisdiction_id: Prisma.FieldRef<"OrderOnJurisdiction", 'Int'>;
}
export type OrderOnJurisdictionFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OrderOnJurisdictionSelect<ExtArgs> | null;
    omit?: Prisma.OrderOnJurisdictionOmit<ExtArgs> | null;
    include?: Prisma.OrderOnJurisdictionInclude<ExtArgs> | null;
    where: Prisma.OrderOnJurisdictionWhereUniqueInput;
};
export type OrderOnJurisdictionFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OrderOnJurisdictionSelect<ExtArgs> | null;
    omit?: Prisma.OrderOnJurisdictionOmit<ExtArgs> | null;
    include?: Prisma.OrderOnJurisdictionInclude<ExtArgs> | null;
    where: Prisma.OrderOnJurisdictionWhereUniqueInput;
};
export type OrderOnJurisdictionFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OrderOnJurisdictionSelect<ExtArgs> | null;
    omit?: Prisma.OrderOnJurisdictionOmit<ExtArgs> | null;
    include?: Prisma.OrderOnJurisdictionInclude<ExtArgs> | null;
    where?: Prisma.OrderOnJurisdictionWhereInput;
    orderBy?: Prisma.OrderOnJurisdictionOrderByWithRelationInput | Prisma.OrderOnJurisdictionOrderByWithRelationInput[];
    cursor?: Prisma.OrderOnJurisdictionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.OrderOnJurisdictionScalarFieldEnum | Prisma.OrderOnJurisdictionScalarFieldEnum[];
};
export type OrderOnJurisdictionFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OrderOnJurisdictionSelect<ExtArgs> | null;
    omit?: Prisma.OrderOnJurisdictionOmit<ExtArgs> | null;
    include?: Prisma.OrderOnJurisdictionInclude<ExtArgs> | null;
    where?: Prisma.OrderOnJurisdictionWhereInput;
    orderBy?: Prisma.OrderOnJurisdictionOrderByWithRelationInput | Prisma.OrderOnJurisdictionOrderByWithRelationInput[];
    cursor?: Prisma.OrderOnJurisdictionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.OrderOnJurisdictionScalarFieldEnum | Prisma.OrderOnJurisdictionScalarFieldEnum[];
};
export type OrderOnJurisdictionFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OrderOnJurisdictionSelect<ExtArgs> | null;
    omit?: Prisma.OrderOnJurisdictionOmit<ExtArgs> | null;
    include?: Prisma.OrderOnJurisdictionInclude<ExtArgs> | null;
    where?: Prisma.OrderOnJurisdictionWhereInput;
    orderBy?: Prisma.OrderOnJurisdictionOrderByWithRelationInput | Prisma.OrderOnJurisdictionOrderByWithRelationInput[];
    cursor?: Prisma.OrderOnJurisdictionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.OrderOnJurisdictionScalarFieldEnum | Prisma.OrderOnJurisdictionScalarFieldEnum[];
};
export type OrderOnJurisdictionCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OrderOnJurisdictionSelect<ExtArgs> | null;
    omit?: Prisma.OrderOnJurisdictionOmit<ExtArgs> | null;
    include?: Prisma.OrderOnJurisdictionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.OrderOnJurisdictionCreateInput, Prisma.OrderOnJurisdictionUncheckedCreateInput>;
};
export type OrderOnJurisdictionCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.OrderOnJurisdictionCreateManyInput | Prisma.OrderOnJurisdictionCreateManyInput[];
    skipDuplicates?: boolean;
};
export type OrderOnJurisdictionCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OrderOnJurisdictionSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.OrderOnJurisdictionOmit<ExtArgs> | null;
    data: Prisma.OrderOnJurisdictionCreateManyInput | Prisma.OrderOnJurisdictionCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.OrderOnJurisdictionIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type OrderOnJurisdictionUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OrderOnJurisdictionSelect<ExtArgs> | null;
    omit?: Prisma.OrderOnJurisdictionOmit<ExtArgs> | null;
    include?: Prisma.OrderOnJurisdictionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.OrderOnJurisdictionUpdateInput, Prisma.OrderOnJurisdictionUncheckedUpdateInput>;
    where: Prisma.OrderOnJurisdictionWhereUniqueInput;
};
export type OrderOnJurisdictionUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.OrderOnJurisdictionUpdateManyMutationInput, Prisma.OrderOnJurisdictionUncheckedUpdateManyInput>;
    where?: Prisma.OrderOnJurisdictionWhereInput;
    limit?: number;
};
export type OrderOnJurisdictionUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OrderOnJurisdictionSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.OrderOnJurisdictionOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.OrderOnJurisdictionUpdateManyMutationInput, Prisma.OrderOnJurisdictionUncheckedUpdateManyInput>;
    where?: Prisma.OrderOnJurisdictionWhereInput;
    limit?: number;
    include?: Prisma.OrderOnJurisdictionIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type OrderOnJurisdictionUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OrderOnJurisdictionSelect<ExtArgs> | null;
    omit?: Prisma.OrderOnJurisdictionOmit<ExtArgs> | null;
    include?: Prisma.OrderOnJurisdictionInclude<ExtArgs> | null;
    where: Prisma.OrderOnJurisdictionWhereUniqueInput;
    create: Prisma.XOR<Prisma.OrderOnJurisdictionCreateInput, Prisma.OrderOnJurisdictionUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.OrderOnJurisdictionUpdateInput, Prisma.OrderOnJurisdictionUncheckedUpdateInput>;
};
export type OrderOnJurisdictionDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OrderOnJurisdictionSelect<ExtArgs> | null;
    omit?: Prisma.OrderOnJurisdictionOmit<ExtArgs> | null;
    include?: Prisma.OrderOnJurisdictionInclude<ExtArgs> | null;
    where: Prisma.OrderOnJurisdictionWhereUniqueInput;
};
export type OrderOnJurisdictionDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OrderOnJurisdictionWhereInput;
    limit?: number;
};
export type OrderOnJurisdictionDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OrderOnJurisdictionSelect<ExtArgs> | null;
    omit?: Prisma.OrderOnJurisdictionOmit<ExtArgs> | null;
    include?: Prisma.OrderOnJurisdictionInclude<ExtArgs> | null;
};
export {};
