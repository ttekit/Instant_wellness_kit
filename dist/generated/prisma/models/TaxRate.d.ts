import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type TaxRateModel = runtime.Types.Result.DefaultSelection<Prisma.$TaxRatePayload>;
export type AggregateTaxRate = {
    _count: TaxRateCountAggregateOutputType | null;
    _avg: TaxRateAvgAggregateOutputType | null;
    _sum: TaxRateSumAggregateOutputType | null;
    _min: TaxRateMinAggregateOutputType | null;
    _max: TaxRateMaxAggregateOutputType | null;
};
export type TaxRateAvgAggregateOutputType = {
    id: number | null;
    rate: runtime.Decimal | null;
    type: runtime.Decimal | null;
    jurisdiction_id: number | null;
};
export type TaxRateSumAggregateOutputType = {
    id: number | null;
    rate: runtime.Decimal | null;
    type: runtime.Decimal | null;
    jurisdiction_id: number | null;
};
export type TaxRateMinAggregateOutputType = {
    id: number | null;
    rate: runtime.Decimal | null;
    type: runtime.Decimal | null;
    created_at: Date | null;
    updated_at: Date | null;
    jurisdiction_id: number | null;
};
export type TaxRateMaxAggregateOutputType = {
    id: number | null;
    rate: runtime.Decimal | null;
    type: runtime.Decimal | null;
    created_at: Date | null;
    updated_at: Date | null;
    jurisdiction_id: number | null;
};
export type TaxRateCountAggregateOutputType = {
    id: number;
    rate: number;
    type: number;
    created_at: number;
    updated_at: number;
    jurisdiction_id: number;
    _all: number;
};
export type TaxRateAvgAggregateInputType = {
    id?: true;
    rate?: true;
    type?: true;
    jurisdiction_id?: true;
};
export type TaxRateSumAggregateInputType = {
    id?: true;
    rate?: true;
    type?: true;
    jurisdiction_id?: true;
};
export type TaxRateMinAggregateInputType = {
    id?: true;
    rate?: true;
    type?: true;
    created_at?: true;
    updated_at?: true;
    jurisdiction_id?: true;
};
export type TaxRateMaxAggregateInputType = {
    id?: true;
    rate?: true;
    type?: true;
    created_at?: true;
    updated_at?: true;
    jurisdiction_id?: true;
};
export type TaxRateCountAggregateInputType = {
    id?: true;
    rate?: true;
    type?: true;
    created_at?: true;
    updated_at?: true;
    jurisdiction_id?: true;
    _all?: true;
};
export type TaxRateAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TaxRateWhereInput;
    orderBy?: Prisma.TaxRateOrderByWithRelationInput | Prisma.TaxRateOrderByWithRelationInput[];
    cursor?: Prisma.TaxRateWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | TaxRateCountAggregateInputType;
    _avg?: TaxRateAvgAggregateInputType;
    _sum?: TaxRateSumAggregateInputType;
    _min?: TaxRateMinAggregateInputType;
    _max?: TaxRateMaxAggregateInputType;
};
export type GetTaxRateAggregateType<T extends TaxRateAggregateArgs> = {
    [P in keyof T & keyof AggregateTaxRate]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateTaxRate[P]> : Prisma.GetScalarType<T[P], AggregateTaxRate[P]>;
};
export type TaxRateGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TaxRateWhereInput;
    orderBy?: Prisma.TaxRateOrderByWithAggregationInput | Prisma.TaxRateOrderByWithAggregationInput[];
    by: Prisma.TaxRateScalarFieldEnum[] | Prisma.TaxRateScalarFieldEnum;
    having?: Prisma.TaxRateScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: TaxRateCountAggregateInputType | true;
    _avg?: TaxRateAvgAggregateInputType;
    _sum?: TaxRateSumAggregateInputType;
    _min?: TaxRateMinAggregateInputType;
    _max?: TaxRateMaxAggregateInputType;
};
export type TaxRateGroupByOutputType = {
    id: number;
    rate: runtime.Decimal;
    type: runtime.Decimal;
    created_at: Date;
    updated_at: Date;
    jurisdiction_id: number;
    _count: TaxRateCountAggregateOutputType | null;
    _avg: TaxRateAvgAggregateOutputType | null;
    _sum: TaxRateSumAggregateOutputType | null;
    _min: TaxRateMinAggregateOutputType | null;
    _max: TaxRateMaxAggregateOutputType | null;
};
type GetTaxRateGroupByPayload<T extends TaxRateGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<TaxRateGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof TaxRateGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], TaxRateGroupByOutputType[P]> : Prisma.GetScalarType<T[P], TaxRateGroupByOutputType[P]>;
}>>;
export type TaxRateWhereInput = {
    AND?: Prisma.TaxRateWhereInput | Prisma.TaxRateWhereInput[];
    OR?: Prisma.TaxRateWhereInput[];
    NOT?: Prisma.TaxRateWhereInput | Prisma.TaxRateWhereInput[];
    id?: Prisma.IntFilter<"TaxRate"> | number;
    rate?: Prisma.DecimalFilter<"TaxRate"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    type?: Prisma.DecimalFilter<"TaxRate"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    created_at?: Prisma.DateTimeFilter<"TaxRate"> | Date | string;
    updated_at?: Prisma.DateTimeFilter<"TaxRate"> | Date | string;
    jurisdiction_id?: Prisma.IntFilter<"TaxRate"> | number;
    jurisdiction?: Prisma.XOR<Prisma.JurisdictionScalarRelationFilter, Prisma.JurisdictionWhereInput>;
};
export type TaxRateOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    rate?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
    jurisdiction_id?: Prisma.SortOrder;
    jurisdiction?: Prisma.JurisdictionOrderByWithRelationInput;
};
export type TaxRateWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    AND?: Prisma.TaxRateWhereInput | Prisma.TaxRateWhereInput[];
    OR?: Prisma.TaxRateWhereInput[];
    NOT?: Prisma.TaxRateWhereInput | Prisma.TaxRateWhereInput[];
    rate?: Prisma.DecimalFilter<"TaxRate"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    type?: Prisma.DecimalFilter<"TaxRate"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    created_at?: Prisma.DateTimeFilter<"TaxRate"> | Date | string;
    updated_at?: Prisma.DateTimeFilter<"TaxRate"> | Date | string;
    jurisdiction_id?: Prisma.IntFilter<"TaxRate"> | number;
    jurisdiction?: Prisma.XOR<Prisma.JurisdictionScalarRelationFilter, Prisma.JurisdictionWhereInput>;
}, "id">;
export type TaxRateOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    rate?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
    jurisdiction_id?: Prisma.SortOrder;
    _count?: Prisma.TaxRateCountOrderByAggregateInput;
    _avg?: Prisma.TaxRateAvgOrderByAggregateInput;
    _max?: Prisma.TaxRateMaxOrderByAggregateInput;
    _min?: Prisma.TaxRateMinOrderByAggregateInput;
    _sum?: Prisma.TaxRateSumOrderByAggregateInput;
};
export type TaxRateScalarWhereWithAggregatesInput = {
    AND?: Prisma.TaxRateScalarWhereWithAggregatesInput | Prisma.TaxRateScalarWhereWithAggregatesInput[];
    OR?: Prisma.TaxRateScalarWhereWithAggregatesInput[];
    NOT?: Prisma.TaxRateScalarWhereWithAggregatesInput | Prisma.TaxRateScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"TaxRate"> | number;
    rate?: Prisma.DecimalWithAggregatesFilter<"TaxRate"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    type?: Prisma.DecimalWithAggregatesFilter<"TaxRate"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    created_at?: Prisma.DateTimeWithAggregatesFilter<"TaxRate"> | Date | string;
    updated_at?: Prisma.DateTimeWithAggregatesFilter<"TaxRate"> | Date | string;
    jurisdiction_id?: Prisma.IntWithAggregatesFilter<"TaxRate"> | number;
};
export type TaxRateCreateInput = {
    rate: runtime.Decimal | runtime.DecimalJsLike | number | string;
    type: runtime.Decimal | runtime.DecimalJsLike | number | string;
    created_at: Date | string;
    updated_at: Date | string;
    jurisdiction: Prisma.JurisdictionCreateNestedOneWithoutTax_ratesInput;
};
export type TaxRateUncheckedCreateInput = {
    id?: number;
    rate: runtime.Decimal | runtime.DecimalJsLike | number | string;
    type: runtime.Decimal | runtime.DecimalJsLike | number | string;
    created_at: Date | string;
    updated_at: Date | string;
    jurisdiction_id: number;
};
export type TaxRateUpdateInput = {
    rate?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    type?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    jurisdiction?: Prisma.JurisdictionUpdateOneRequiredWithoutTax_ratesNestedInput;
};
export type TaxRateUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    rate?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    type?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    jurisdiction_id?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type TaxRateCreateManyInput = {
    id?: number;
    rate: runtime.Decimal | runtime.DecimalJsLike | number | string;
    type: runtime.Decimal | runtime.DecimalJsLike | number | string;
    created_at: Date | string;
    updated_at: Date | string;
    jurisdiction_id: number;
};
export type TaxRateUpdateManyMutationInput = {
    rate?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    type?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TaxRateUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    rate?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    type?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    jurisdiction_id?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type TaxRateListRelationFilter = {
    every?: Prisma.TaxRateWhereInput;
    some?: Prisma.TaxRateWhereInput;
    none?: Prisma.TaxRateWhereInput;
};
export type TaxRateOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type TaxRateCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    rate?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
    jurisdiction_id?: Prisma.SortOrder;
};
export type TaxRateAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    rate?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    jurisdiction_id?: Prisma.SortOrder;
};
export type TaxRateMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    rate?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
    jurisdiction_id?: Prisma.SortOrder;
};
export type TaxRateMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    rate?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
    updated_at?: Prisma.SortOrder;
    jurisdiction_id?: Prisma.SortOrder;
};
export type TaxRateSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    rate?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    jurisdiction_id?: Prisma.SortOrder;
};
export type TaxRateCreateNestedManyWithoutJurisdictionInput = {
    create?: Prisma.XOR<Prisma.TaxRateCreateWithoutJurisdictionInput, Prisma.TaxRateUncheckedCreateWithoutJurisdictionInput> | Prisma.TaxRateCreateWithoutJurisdictionInput[] | Prisma.TaxRateUncheckedCreateWithoutJurisdictionInput[];
    connectOrCreate?: Prisma.TaxRateCreateOrConnectWithoutJurisdictionInput | Prisma.TaxRateCreateOrConnectWithoutJurisdictionInput[];
    createMany?: Prisma.TaxRateCreateManyJurisdictionInputEnvelope;
    connect?: Prisma.TaxRateWhereUniqueInput | Prisma.TaxRateWhereUniqueInput[];
};
export type TaxRateUncheckedCreateNestedManyWithoutJurisdictionInput = {
    create?: Prisma.XOR<Prisma.TaxRateCreateWithoutJurisdictionInput, Prisma.TaxRateUncheckedCreateWithoutJurisdictionInput> | Prisma.TaxRateCreateWithoutJurisdictionInput[] | Prisma.TaxRateUncheckedCreateWithoutJurisdictionInput[];
    connectOrCreate?: Prisma.TaxRateCreateOrConnectWithoutJurisdictionInput | Prisma.TaxRateCreateOrConnectWithoutJurisdictionInput[];
    createMany?: Prisma.TaxRateCreateManyJurisdictionInputEnvelope;
    connect?: Prisma.TaxRateWhereUniqueInput | Prisma.TaxRateWhereUniqueInput[];
};
export type TaxRateUpdateManyWithoutJurisdictionNestedInput = {
    create?: Prisma.XOR<Prisma.TaxRateCreateWithoutJurisdictionInput, Prisma.TaxRateUncheckedCreateWithoutJurisdictionInput> | Prisma.TaxRateCreateWithoutJurisdictionInput[] | Prisma.TaxRateUncheckedCreateWithoutJurisdictionInput[];
    connectOrCreate?: Prisma.TaxRateCreateOrConnectWithoutJurisdictionInput | Prisma.TaxRateCreateOrConnectWithoutJurisdictionInput[];
    upsert?: Prisma.TaxRateUpsertWithWhereUniqueWithoutJurisdictionInput | Prisma.TaxRateUpsertWithWhereUniqueWithoutJurisdictionInput[];
    createMany?: Prisma.TaxRateCreateManyJurisdictionInputEnvelope;
    set?: Prisma.TaxRateWhereUniqueInput | Prisma.TaxRateWhereUniqueInput[];
    disconnect?: Prisma.TaxRateWhereUniqueInput | Prisma.TaxRateWhereUniqueInput[];
    delete?: Prisma.TaxRateWhereUniqueInput | Prisma.TaxRateWhereUniqueInput[];
    connect?: Prisma.TaxRateWhereUniqueInput | Prisma.TaxRateWhereUniqueInput[];
    update?: Prisma.TaxRateUpdateWithWhereUniqueWithoutJurisdictionInput | Prisma.TaxRateUpdateWithWhereUniqueWithoutJurisdictionInput[];
    updateMany?: Prisma.TaxRateUpdateManyWithWhereWithoutJurisdictionInput | Prisma.TaxRateUpdateManyWithWhereWithoutJurisdictionInput[];
    deleteMany?: Prisma.TaxRateScalarWhereInput | Prisma.TaxRateScalarWhereInput[];
};
export type TaxRateUncheckedUpdateManyWithoutJurisdictionNestedInput = {
    create?: Prisma.XOR<Prisma.TaxRateCreateWithoutJurisdictionInput, Prisma.TaxRateUncheckedCreateWithoutJurisdictionInput> | Prisma.TaxRateCreateWithoutJurisdictionInput[] | Prisma.TaxRateUncheckedCreateWithoutJurisdictionInput[];
    connectOrCreate?: Prisma.TaxRateCreateOrConnectWithoutJurisdictionInput | Prisma.TaxRateCreateOrConnectWithoutJurisdictionInput[];
    upsert?: Prisma.TaxRateUpsertWithWhereUniqueWithoutJurisdictionInput | Prisma.TaxRateUpsertWithWhereUniqueWithoutJurisdictionInput[];
    createMany?: Prisma.TaxRateCreateManyJurisdictionInputEnvelope;
    set?: Prisma.TaxRateWhereUniqueInput | Prisma.TaxRateWhereUniqueInput[];
    disconnect?: Prisma.TaxRateWhereUniqueInput | Prisma.TaxRateWhereUniqueInput[];
    delete?: Prisma.TaxRateWhereUniqueInput | Prisma.TaxRateWhereUniqueInput[];
    connect?: Prisma.TaxRateWhereUniqueInput | Prisma.TaxRateWhereUniqueInput[];
    update?: Prisma.TaxRateUpdateWithWhereUniqueWithoutJurisdictionInput | Prisma.TaxRateUpdateWithWhereUniqueWithoutJurisdictionInput[];
    updateMany?: Prisma.TaxRateUpdateManyWithWhereWithoutJurisdictionInput | Prisma.TaxRateUpdateManyWithWhereWithoutJurisdictionInput[];
    deleteMany?: Prisma.TaxRateScalarWhereInput | Prisma.TaxRateScalarWhereInput[];
};
export type TaxRateCreateWithoutJurisdictionInput = {
    rate: runtime.Decimal | runtime.DecimalJsLike | number | string;
    type: runtime.Decimal | runtime.DecimalJsLike | number | string;
    created_at: Date | string;
    updated_at: Date | string;
};
export type TaxRateUncheckedCreateWithoutJurisdictionInput = {
    id?: number;
    rate: runtime.Decimal | runtime.DecimalJsLike | number | string;
    type: runtime.Decimal | runtime.DecimalJsLike | number | string;
    created_at: Date | string;
    updated_at: Date | string;
};
export type TaxRateCreateOrConnectWithoutJurisdictionInput = {
    where: Prisma.TaxRateWhereUniqueInput;
    create: Prisma.XOR<Prisma.TaxRateCreateWithoutJurisdictionInput, Prisma.TaxRateUncheckedCreateWithoutJurisdictionInput>;
};
export type TaxRateCreateManyJurisdictionInputEnvelope = {
    data: Prisma.TaxRateCreateManyJurisdictionInput | Prisma.TaxRateCreateManyJurisdictionInput[];
    skipDuplicates?: boolean;
};
export type TaxRateUpsertWithWhereUniqueWithoutJurisdictionInput = {
    where: Prisma.TaxRateWhereUniqueInput;
    update: Prisma.XOR<Prisma.TaxRateUpdateWithoutJurisdictionInput, Prisma.TaxRateUncheckedUpdateWithoutJurisdictionInput>;
    create: Prisma.XOR<Prisma.TaxRateCreateWithoutJurisdictionInput, Prisma.TaxRateUncheckedCreateWithoutJurisdictionInput>;
};
export type TaxRateUpdateWithWhereUniqueWithoutJurisdictionInput = {
    where: Prisma.TaxRateWhereUniqueInput;
    data: Prisma.XOR<Prisma.TaxRateUpdateWithoutJurisdictionInput, Prisma.TaxRateUncheckedUpdateWithoutJurisdictionInput>;
};
export type TaxRateUpdateManyWithWhereWithoutJurisdictionInput = {
    where: Prisma.TaxRateScalarWhereInput;
    data: Prisma.XOR<Prisma.TaxRateUpdateManyMutationInput, Prisma.TaxRateUncheckedUpdateManyWithoutJurisdictionInput>;
};
export type TaxRateScalarWhereInput = {
    AND?: Prisma.TaxRateScalarWhereInput | Prisma.TaxRateScalarWhereInput[];
    OR?: Prisma.TaxRateScalarWhereInput[];
    NOT?: Prisma.TaxRateScalarWhereInput | Prisma.TaxRateScalarWhereInput[];
    id?: Prisma.IntFilter<"TaxRate"> | number;
    rate?: Prisma.DecimalFilter<"TaxRate"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    type?: Prisma.DecimalFilter<"TaxRate"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    created_at?: Prisma.DateTimeFilter<"TaxRate"> | Date | string;
    updated_at?: Prisma.DateTimeFilter<"TaxRate"> | Date | string;
    jurisdiction_id?: Prisma.IntFilter<"TaxRate"> | number;
};
export type TaxRateCreateManyJurisdictionInput = {
    id?: number;
    rate: runtime.Decimal | runtime.DecimalJsLike | number | string;
    type: runtime.Decimal | runtime.DecimalJsLike | number | string;
    created_at: Date | string;
    updated_at: Date | string;
};
export type TaxRateUpdateWithoutJurisdictionInput = {
    rate?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    type?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TaxRateUncheckedUpdateWithoutJurisdictionInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    rate?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    type?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TaxRateUncheckedUpdateManyWithoutJurisdictionInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    rate?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    type?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TaxRateSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    rate?: boolean;
    type?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    jurisdiction_id?: boolean;
    jurisdiction?: boolean | Prisma.JurisdictionDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["taxRate"]>;
export type TaxRateSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    rate?: boolean;
    type?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    jurisdiction_id?: boolean;
    jurisdiction?: boolean | Prisma.JurisdictionDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["taxRate"]>;
export type TaxRateSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    rate?: boolean;
    type?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    jurisdiction_id?: boolean;
    jurisdiction?: boolean | Prisma.JurisdictionDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["taxRate"]>;
export type TaxRateSelectScalar = {
    id?: boolean;
    rate?: boolean;
    type?: boolean;
    created_at?: boolean;
    updated_at?: boolean;
    jurisdiction_id?: boolean;
};
export type TaxRateOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "rate" | "type" | "created_at" | "updated_at" | "jurisdiction_id", ExtArgs["result"]["taxRate"]>;
export type TaxRateInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    jurisdiction?: boolean | Prisma.JurisdictionDefaultArgs<ExtArgs>;
};
export type TaxRateIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    jurisdiction?: boolean | Prisma.JurisdictionDefaultArgs<ExtArgs>;
};
export type TaxRateIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    jurisdiction?: boolean | Prisma.JurisdictionDefaultArgs<ExtArgs>;
};
export type $TaxRatePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "TaxRate";
    objects: {
        jurisdiction: Prisma.$JurisdictionPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        rate: runtime.Decimal;
        type: runtime.Decimal;
        created_at: Date;
        updated_at: Date;
        jurisdiction_id: number;
    }, ExtArgs["result"]["taxRate"]>;
    composites: {};
};
export type TaxRateGetPayload<S extends boolean | null | undefined | TaxRateDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$TaxRatePayload, S>;
export type TaxRateCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<TaxRateFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: TaxRateCountAggregateInputType | true;
};
export interface TaxRateDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['TaxRate'];
        meta: {
            name: 'TaxRate';
        };
    };
    findUnique<T extends TaxRateFindUniqueArgs>(args: Prisma.SelectSubset<T, TaxRateFindUniqueArgs<ExtArgs>>): Prisma.Prisma__TaxRateClient<runtime.Types.Result.GetResult<Prisma.$TaxRatePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends TaxRateFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, TaxRateFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__TaxRateClient<runtime.Types.Result.GetResult<Prisma.$TaxRatePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends TaxRateFindFirstArgs>(args?: Prisma.SelectSubset<T, TaxRateFindFirstArgs<ExtArgs>>): Prisma.Prisma__TaxRateClient<runtime.Types.Result.GetResult<Prisma.$TaxRatePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends TaxRateFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, TaxRateFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__TaxRateClient<runtime.Types.Result.GetResult<Prisma.$TaxRatePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends TaxRateFindManyArgs>(args?: Prisma.SelectSubset<T, TaxRateFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TaxRatePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends TaxRateCreateArgs>(args: Prisma.SelectSubset<T, TaxRateCreateArgs<ExtArgs>>): Prisma.Prisma__TaxRateClient<runtime.Types.Result.GetResult<Prisma.$TaxRatePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends TaxRateCreateManyArgs>(args?: Prisma.SelectSubset<T, TaxRateCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends TaxRateCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, TaxRateCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TaxRatePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends TaxRateDeleteArgs>(args: Prisma.SelectSubset<T, TaxRateDeleteArgs<ExtArgs>>): Prisma.Prisma__TaxRateClient<runtime.Types.Result.GetResult<Prisma.$TaxRatePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends TaxRateUpdateArgs>(args: Prisma.SelectSubset<T, TaxRateUpdateArgs<ExtArgs>>): Prisma.Prisma__TaxRateClient<runtime.Types.Result.GetResult<Prisma.$TaxRatePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends TaxRateDeleteManyArgs>(args?: Prisma.SelectSubset<T, TaxRateDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends TaxRateUpdateManyArgs>(args: Prisma.SelectSubset<T, TaxRateUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends TaxRateUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, TaxRateUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TaxRatePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends TaxRateUpsertArgs>(args: Prisma.SelectSubset<T, TaxRateUpsertArgs<ExtArgs>>): Prisma.Prisma__TaxRateClient<runtime.Types.Result.GetResult<Prisma.$TaxRatePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends TaxRateCountArgs>(args?: Prisma.Subset<T, TaxRateCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], TaxRateCountAggregateOutputType> : number>;
    aggregate<T extends TaxRateAggregateArgs>(args: Prisma.Subset<T, TaxRateAggregateArgs>): Prisma.PrismaPromise<GetTaxRateAggregateType<T>>;
    groupBy<T extends TaxRateGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: TaxRateGroupByArgs['orderBy'];
    } : {
        orderBy?: TaxRateGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, TaxRateGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTaxRateGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: TaxRateFieldRefs;
}
export interface Prisma__TaxRateClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    jurisdiction<T extends Prisma.JurisdictionDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.JurisdictionDefaultArgs<ExtArgs>>): Prisma.Prisma__JurisdictionClient<runtime.Types.Result.GetResult<Prisma.$JurisdictionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface TaxRateFieldRefs {
    readonly id: Prisma.FieldRef<"TaxRate", 'Int'>;
    readonly rate: Prisma.FieldRef<"TaxRate", 'Decimal'>;
    readonly type: Prisma.FieldRef<"TaxRate", 'Decimal'>;
    readonly created_at: Prisma.FieldRef<"TaxRate", 'DateTime'>;
    readonly updated_at: Prisma.FieldRef<"TaxRate", 'DateTime'>;
    readonly jurisdiction_id: Prisma.FieldRef<"TaxRate", 'Int'>;
}
export type TaxRateFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TaxRateSelect<ExtArgs> | null;
    omit?: Prisma.TaxRateOmit<ExtArgs> | null;
    include?: Prisma.TaxRateInclude<ExtArgs> | null;
    where: Prisma.TaxRateWhereUniqueInput;
};
export type TaxRateFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TaxRateSelect<ExtArgs> | null;
    omit?: Prisma.TaxRateOmit<ExtArgs> | null;
    include?: Prisma.TaxRateInclude<ExtArgs> | null;
    where: Prisma.TaxRateWhereUniqueInput;
};
export type TaxRateFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TaxRateSelect<ExtArgs> | null;
    omit?: Prisma.TaxRateOmit<ExtArgs> | null;
    include?: Prisma.TaxRateInclude<ExtArgs> | null;
    where?: Prisma.TaxRateWhereInput;
    orderBy?: Prisma.TaxRateOrderByWithRelationInput | Prisma.TaxRateOrderByWithRelationInput[];
    cursor?: Prisma.TaxRateWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TaxRateScalarFieldEnum | Prisma.TaxRateScalarFieldEnum[];
};
export type TaxRateFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TaxRateSelect<ExtArgs> | null;
    omit?: Prisma.TaxRateOmit<ExtArgs> | null;
    include?: Prisma.TaxRateInclude<ExtArgs> | null;
    where?: Prisma.TaxRateWhereInput;
    orderBy?: Prisma.TaxRateOrderByWithRelationInput | Prisma.TaxRateOrderByWithRelationInput[];
    cursor?: Prisma.TaxRateWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TaxRateScalarFieldEnum | Prisma.TaxRateScalarFieldEnum[];
};
export type TaxRateFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TaxRateSelect<ExtArgs> | null;
    omit?: Prisma.TaxRateOmit<ExtArgs> | null;
    include?: Prisma.TaxRateInclude<ExtArgs> | null;
    where?: Prisma.TaxRateWhereInput;
    orderBy?: Prisma.TaxRateOrderByWithRelationInput | Prisma.TaxRateOrderByWithRelationInput[];
    cursor?: Prisma.TaxRateWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TaxRateScalarFieldEnum | Prisma.TaxRateScalarFieldEnum[];
};
export type TaxRateCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TaxRateSelect<ExtArgs> | null;
    omit?: Prisma.TaxRateOmit<ExtArgs> | null;
    include?: Prisma.TaxRateInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TaxRateCreateInput, Prisma.TaxRateUncheckedCreateInput>;
};
export type TaxRateCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.TaxRateCreateManyInput | Prisma.TaxRateCreateManyInput[];
    skipDuplicates?: boolean;
};
export type TaxRateCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TaxRateSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.TaxRateOmit<ExtArgs> | null;
    data: Prisma.TaxRateCreateManyInput | Prisma.TaxRateCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.TaxRateIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type TaxRateUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TaxRateSelect<ExtArgs> | null;
    omit?: Prisma.TaxRateOmit<ExtArgs> | null;
    include?: Prisma.TaxRateInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TaxRateUpdateInput, Prisma.TaxRateUncheckedUpdateInput>;
    where: Prisma.TaxRateWhereUniqueInput;
};
export type TaxRateUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.TaxRateUpdateManyMutationInput, Prisma.TaxRateUncheckedUpdateManyInput>;
    where?: Prisma.TaxRateWhereInput;
    limit?: number;
};
export type TaxRateUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TaxRateSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.TaxRateOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TaxRateUpdateManyMutationInput, Prisma.TaxRateUncheckedUpdateManyInput>;
    where?: Prisma.TaxRateWhereInput;
    limit?: number;
    include?: Prisma.TaxRateIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type TaxRateUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TaxRateSelect<ExtArgs> | null;
    omit?: Prisma.TaxRateOmit<ExtArgs> | null;
    include?: Prisma.TaxRateInclude<ExtArgs> | null;
    where: Prisma.TaxRateWhereUniqueInput;
    create: Prisma.XOR<Prisma.TaxRateCreateInput, Prisma.TaxRateUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.TaxRateUpdateInput, Prisma.TaxRateUncheckedUpdateInput>;
};
export type TaxRateDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TaxRateSelect<ExtArgs> | null;
    omit?: Prisma.TaxRateOmit<ExtArgs> | null;
    include?: Prisma.TaxRateInclude<ExtArgs> | null;
    where: Prisma.TaxRateWhereUniqueInput;
};
export type TaxRateDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TaxRateWhereInput;
    limit?: number;
};
export type TaxRateDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TaxRateSelect<ExtArgs> | null;
    omit?: Prisma.TaxRateOmit<ExtArgs> | null;
    include?: Prisma.TaxRateInclude<ExtArgs> | null;
};
export {};
