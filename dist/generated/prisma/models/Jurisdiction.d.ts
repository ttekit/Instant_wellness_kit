import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type JurisdictionModel = runtime.Types.Result.DefaultSelection<Prisma.$JurisdictionPayload>;
export type AggregateJurisdiction = {
    _count: JurisdictionCountAggregateOutputType | null;
    _avg: JurisdictionAvgAggregateOutputType | null;
    _sum: JurisdictionSumAggregateOutputType | null;
    _min: JurisdictionMinAggregateOutputType | null;
    _max: JurisdictionMaxAggregateOutputType | null;
};
export type JurisdictionAvgAggregateOutputType = {
    id: number | null;
};
export type JurisdictionSumAggregateOutputType = {
    id: number | null;
};
export type JurisdictionMinAggregateOutputType = {
    id: number | null;
    name: string | null;
};
export type JurisdictionMaxAggregateOutputType = {
    id: number | null;
    name: string | null;
};
export type JurisdictionCountAggregateOutputType = {
    id: number;
    name: number;
    _all: number;
};
export type JurisdictionAvgAggregateInputType = {
    id?: true;
};
export type JurisdictionSumAggregateInputType = {
    id?: true;
};
export type JurisdictionMinAggregateInputType = {
    id?: true;
    name?: true;
};
export type JurisdictionMaxAggregateInputType = {
    id?: true;
    name?: true;
};
export type JurisdictionCountAggregateInputType = {
    id?: true;
    name?: true;
    _all?: true;
};
export type JurisdictionAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.JurisdictionWhereInput;
    orderBy?: Prisma.JurisdictionOrderByWithRelationInput | Prisma.JurisdictionOrderByWithRelationInput[];
    cursor?: Prisma.JurisdictionWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | JurisdictionCountAggregateInputType;
    _avg?: JurisdictionAvgAggregateInputType;
    _sum?: JurisdictionSumAggregateInputType;
    _min?: JurisdictionMinAggregateInputType;
    _max?: JurisdictionMaxAggregateInputType;
};
export type GetJurisdictionAggregateType<T extends JurisdictionAggregateArgs> = {
    [P in keyof T & keyof AggregateJurisdiction]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateJurisdiction[P]> : Prisma.GetScalarType<T[P], AggregateJurisdiction[P]>;
};
export type JurisdictionGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.JurisdictionWhereInput;
    orderBy?: Prisma.JurisdictionOrderByWithAggregationInput | Prisma.JurisdictionOrderByWithAggregationInput[];
    by: Prisma.JurisdictionScalarFieldEnum[] | Prisma.JurisdictionScalarFieldEnum;
    having?: Prisma.JurisdictionScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: JurisdictionCountAggregateInputType | true;
    _avg?: JurisdictionAvgAggregateInputType;
    _sum?: JurisdictionSumAggregateInputType;
    _min?: JurisdictionMinAggregateInputType;
    _max?: JurisdictionMaxAggregateInputType;
};
export type JurisdictionGroupByOutputType = {
    id: number;
    name: string;
    _count: JurisdictionCountAggregateOutputType | null;
    _avg: JurisdictionAvgAggregateOutputType | null;
    _sum: JurisdictionSumAggregateOutputType | null;
    _min: JurisdictionMinAggregateOutputType | null;
    _max: JurisdictionMaxAggregateOutputType | null;
};
type GetJurisdictionGroupByPayload<T extends JurisdictionGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<JurisdictionGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof JurisdictionGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], JurisdictionGroupByOutputType[P]> : Prisma.GetScalarType<T[P], JurisdictionGroupByOutputType[P]>;
}>>;
export type JurisdictionWhereInput = {
    AND?: Prisma.JurisdictionWhereInput | Prisma.JurisdictionWhereInput[];
    OR?: Prisma.JurisdictionWhereInput[];
    NOT?: Prisma.JurisdictionWhereInput | Prisma.JurisdictionWhereInput[];
    id?: Prisma.IntFilter<"Jurisdiction"> | number;
    name?: Prisma.StringFilter<"Jurisdiction"> | string;
    tax_rates?: Prisma.TaxRateListRelationFilter;
    orders?: Prisma.OrderOnJurisdictionListRelationFilter;
};
export type JurisdictionOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    tax_rates?: Prisma.TaxRateOrderByRelationAggregateInput;
    orders?: Prisma.OrderOnJurisdictionOrderByRelationAggregateInput;
};
export type JurisdictionWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    AND?: Prisma.JurisdictionWhereInput | Prisma.JurisdictionWhereInput[];
    OR?: Prisma.JurisdictionWhereInput[];
    NOT?: Prisma.JurisdictionWhereInput | Prisma.JurisdictionWhereInput[];
    name?: Prisma.StringFilter<"Jurisdiction"> | string;
    tax_rates?: Prisma.TaxRateListRelationFilter;
    orders?: Prisma.OrderOnJurisdictionListRelationFilter;
}, "id">;
export type JurisdictionOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    _count?: Prisma.JurisdictionCountOrderByAggregateInput;
    _avg?: Prisma.JurisdictionAvgOrderByAggregateInput;
    _max?: Prisma.JurisdictionMaxOrderByAggregateInput;
    _min?: Prisma.JurisdictionMinOrderByAggregateInput;
    _sum?: Prisma.JurisdictionSumOrderByAggregateInput;
};
export type JurisdictionScalarWhereWithAggregatesInput = {
    AND?: Prisma.JurisdictionScalarWhereWithAggregatesInput | Prisma.JurisdictionScalarWhereWithAggregatesInput[];
    OR?: Prisma.JurisdictionScalarWhereWithAggregatesInput[];
    NOT?: Prisma.JurisdictionScalarWhereWithAggregatesInput | Prisma.JurisdictionScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"Jurisdiction"> | number;
    name?: Prisma.StringWithAggregatesFilter<"Jurisdiction"> | string;
};
export type JurisdictionCreateInput = {
    name: string;
    tax_rates?: Prisma.TaxRateCreateNestedManyWithoutJurisdictionInput;
    orders?: Prisma.OrderOnJurisdictionCreateNestedManyWithoutJurisdictionInput;
};
export type JurisdictionUncheckedCreateInput = {
    id?: number;
    name: string;
    tax_rates?: Prisma.TaxRateUncheckedCreateNestedManyWithoutJurisdictionInput;
    orders?: Prisma.OrderOnJurisdictionUncheckedCreateNestedManyWithoutJurisdictionInput;
};
export type JurisdictionUpdateInput = {
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    tax_rates?: Prisma.TaxRateUpdateManyWithoutJurisdictionNestedInput;
    orders?: Prisma.OrderOnJurisdictionUpdateManyWithoutJurisdictionNestedInput;
};
export type JurisdictionUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    tax_rates?: Prisma.TaxRateUncheckedUpdateManyWithoutJurisdictionNestedInput;
    orders?: Prisma.OrderOnJurisdictionUncheckedUpdateManyWithoutJurisdictionNestedInput;
};
export type JurisdictionCreateManyInput = {
    id?: number;
    name: string;
};
export type JurisdictionUpdateManyMutationInput = {
    name?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type JurisdictionUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type JurisdictionCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
};
export type JurisdictionAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
};
export type JurisdictionMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
};
export type JurisdictionMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
};
export type JurisdictionSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
};
export type JurisdictionScalarRelationFilter = {
    is?: Prisma.JurisdictionWhereInput;
    isNot?: Prisma.JurisdictionWhereInput;
};
export type JurisdictionCreateNestedOneWithoutOrdersInput = {
    create?: Prisma.XOR<Prisma.JurisdictionCreateWithoutOrdersInput, Prisma.JurisdictionUncheckedCreateWithoutOrdersInput>;
    connectOrCreate?: Prisma.JurisdictionCreateOrConnectWithoutOrdersInput;
    connect?: Prisma.JurisdictionWhereUniqueInput;
};
export type JurisdictionUpdateOneRequiredWithoutOrdersNestedInput = {
    create?: Prisma.XOR<Prisma.JurisdictionCreateWithoutOrdersInput, Prisma.JurisdictionUncheckedCreateWithoutOrdersInput>;
    connectOrCreate?: Prisma.JurisdictionCreateOrConnectWithoutOrdersInput;
    upsert?: Prisma.JurisdictionUpsertWithoutOrdersInput;
    connect?: Prisma.JurisdictionWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.JurisdictionUpdateToOneWithWhereWithoutOrdersInput, Prisma.JurisdictionUpdateWithoutOrdersInput>, Prisma.JurisdictionUncheckedUpdateWithoutOrdersInput>;
};
export type JurisdictionCreateNestedOneWithoutTax_ratesInput = {
    create?: Prisma.XOR<Prisma.JurisdictionCreateWithoutTax_ratesInput, Prisma.JurisdictionUncheckedCreateWithoutTax_ratesInput>;
    connectOrCreate?: Prisma.JurisdictionCreateOrConnectWithoutTax_ratesInput;
    connect?: Prisma.JurisdictionWhereUniqueInput;
};
export type JurisdictionUpdateOneRequiredWithoutTax_ratesNestedInput = {
    create?: Prisma.XOR<Prisma.JurisdictionCreateWithoutTax_ratesInput, Prisma.JurisdictionUncheckedCreateWithoutTax_ratesInput>;
    connectOrCreate?: Prisma.JurisdictionCreateOrConnectWithoutTax_ratesInput;
    upsert?: Prisma.JurisdictionUpsertWithoutTax_ratesInput;
    connect?: Prisma.JurisdictionWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.JurisdictionUpdateToOneWithWhereWithoutTax_ratesInput, Prisma.JurisdictionUpdateWithoutTax_ratesInput>, Prisma.JurisdictionUncheckedUpdateWithoutTax_ratesInput>;
};
export type JurisdictionCreateWithoutOrdersInput = {
    name: string;
    tax_rates?: Prisma.TaxRateCreateNestedManyWithoutJurisdictionInput;
};
export type JurisdictionUncheckedCreateWithoutOrdersInput = {
    id?: number;
    name: string;
    tax_rates?: Prisma.TaxRateUncheckedCreateNestedManyWithoutJurisdictionInput;
};
export type JurisdictionCreateOrConnectWithoutOrdersInput = {
    where: Prisma.JurisdictionWhereUniqueInput;
    create: Prisma.XOR<Prisma.JurisdictionCreateWithoutOrdersInput, Prisma.JurisdictionUncheckedCreateWithoutOrdersInput>;
};
export type JurisdictionUpsertWithoutOrdersInput = {
    update: Prisma.XOR<Prisma.JurisdictionUpdateWithoutOrdersInput, Prisma.JurisdictionUncheckedUpdateWithoutOrdersInput>;
    create: Prisma.XOR<Prisma.JurisdictionCreateWithoutOrdersInput, Prisma.JurisdictionUncheckedCreateWithoutOrdersInput>;
    where?: Prisma.JurisdictionWhereInput;
};
export type JurisdictionUpdateToOneWithWhereWithoutOrdersInput = {
    where?: Prisma.JurisdictionWhereInput;
    data: Prisma.XOR<Prisma.JurisdictionUpdateWithoutOrdersInput, Prisma.JurisdictionUncheckedUpdateWithoutOrdersInput>;
};
export type JurisdictionUpdateWithoutOrdersInput = {
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    tax_rates?: Prisma.TaxRateUpdateManyWithoutJurisdictionNestedInput;
};
export type JurisdictionUncheckedUpdateWithoutOrdersInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    tax_rates?: Prisma.TaxRateUncheckedUpdateManyWithoutJurisdictionNestedInput;
};
export type JurisdictionCreateWithoutTax_ratesInput = {
    name: string;
    orders?: Prisma.OrderOnJurisdictionCreateNestedManyWithoutJurisdictionInput;
};
export type JurisdictionUncheckedCreateWithoutTax_ratesInput = {
    id?: number;
    name: string;
    orders?: Prisma.OrderOnJurisdictionUncheckedCreateNestedManyWithoutJurisdictionInput;
};
export type JurisdictionCreateOrConnectWithoutTax_ratesInput = {
    where: Prisma.JurisdictionWhereUniqueInput;
    create: Prisma.XOR<Prisma.JurisdictionCreateWithoutTax_ratesInput, Prisma.JurisdictionUncheckedCreateWithoutTax_ratesInput>;
};
export type JurisdictionUpsertWithoutTax_ratesInput = {
    update: Prisma.XOR<Prisma.JurisdictionUpdateWithoutTax_ratesInput, Prisma.JurisdictionUncheckedUpdateWithoutTax_ratesInput>;
    create: Prisma.XOR<Prisma.JurisdictionCreateWithoutTax_ratesInput, Prisma.JurisdictionUncheckedCreateWithoutTax_ratesInput>;
    where?: Prisma.JurisdictionWhereInput;
};
export type JurisdictionUpdateToOneWithWhereWithoutTax_ratesInput = {
    where?: Prisma.JurisdictionWhereInput;
    data: Prisma.XOR<Prisma.JurisdictionUpdateWithoutTax_ratesInput, Prisma.JurisdictionUncheckedUpdateWithoutTax_ratesInput>;
};
export type JurisdictionUpdateWithoutTax_ratesInput = {
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    orders?: Prisma.OrderOnJurisdictionUpdateManyWithoutJurisdictionNestedInput;
};
export type JurisdictionUncheckedUpdateWithoutTax_ratesInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    orders?: Prisma.OrderOnJurisdictionUncheckedUpdateManyWithoutJurisdictionNestedInput;
};
export type JurisdictionCountOutputType = {
    tax_rates: number;
    orders: number;
};
export type JurisdictionCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tax_rates?: boolean | JurisdictionCountOutputTypeCountTax_ratesArgs;
    orders?: boolean | JurisdictionCountOutputTypeCountOrdersArgs;
};
export type JurisdictionCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.JurisdictionCountOutputTypeSelect<ExtArgs> | null;
};
export type JurisdictionCountOutputTypeCountTax_ratesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TaxRateWhereInput;
};
export type JurisdictionCountOutputTypeCountOrdersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OrderOnJurisdictionWhereInput;
};
export type JurisdictionSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    tax_rates?: boolean | Prisma.Jurisdiction$tax_ratesArgs<ExtArgs>;
    orders?: boolean | Prisma.Jurisdiction$ordersArgs<ExtArgs>;
    _count?: boolean | Prisma.JurisdictionCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["jurisdiction"]>;
export type JurisdictionSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
}, ExtArgs["result"]["jurisdiction"]>;
export type JurisdictionSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
}, ExtArgs["result"]["jurisdiction"]>;
export type JurisdictionSelectScalar = {
    id?: boolean;
    name?: boolean;
};
export type JurisdictionOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "name", ExtArgs["result"]["jurisdiction"]>;
export type JurisdictionInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tax_rates?: boolean | Prisma.Jurisdiction$tax_ratesArgs<ExtArgs>;
    orders?: boolean | Prisma.Jurisdiction$ordersArgs<ExtArgs>;
    _count?: boolean | Prisma.JurisdictionCountOutputTypeDefaultArgs<ExtArgs>;
};
export type JurisdictionIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type JurisdictionIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $JurisdictionPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Jurisdiction";
    objects: {
        tax_rates: Prisma.$TaxRatePayload<ExtArgs>[];
        orders: Prisma.$OrderOnJurisdictionPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        name: string;
    }, ExtArgs["result"]["jurisdiction"]>;
    composites: {};
};
export type JurisdictionGetPayload<S extends boolean | null | undefined | JurisdictionDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$JurisdictionPayload, S>;
export type JurisdictionCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<JurisdictionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: JurisdictionCountAggregateInputType | true;
};
export interface JurisdictionDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Jurisdiction'];
        meta: {
            name: 'Jurisdiction';
        };
    };
    findUnique<T extends JurisdictionFindUniqueArgs>(args: Prisma.SelectSubset<T, JurisdictionFindUniqueArgs<ExtArgs>>): Prisma.Prisma__JurisdictionClient<runtime.Types.Result.GetResult<Prisma.$JurisdictionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends JurisdictionFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, JurisdictionFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__JurisdictionClient<runtime.Types.Result.GetResult<Prisma.$JurisdictionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends JurisdictionFindFirstArgs>(args?: Prisma.SelectSubset<T, JurisdictionFindFirstArgs<ExtArgs>>): Prisma.Prisma__JurisdictionClient<runtime.Types.Result.GetResult<Prisma.$JurisdictionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends JurisdictionFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, JurisdictionFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__JurisdictionClient<runtime.Types.Result.GetResult<Prisma.$JurisdictionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends JurisdictionFindManyArgs>(args?: Prisma.SelectSubset<T, JurisdictionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$JurisdictionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends JurisdictionCreateArgs>(args: Prisma.SelectSubset<T, JurisdictionCreateArgs<ExtArgs>>): Prisma.Prisma__JurisdictionClient<runtime.Types.Result.GetResult<Prisma.$JurisdictionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends JurisdictionCreateManyArgs>(args?: Prisma.SelectSubset<T, JurisdictionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends JurisdictionCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, JurisdictionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$JurisdictionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends JurisdictionDeleteArgs>(args: Prisma.SelectSubset<T, JurisdictionDeleteArgs<ExtArgs>>): Prisma.Prisma__JurisdictionClient<runtime.Types.Result.GetResult<Prisma.$JurisdictionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends JurisdictionUpdateArgs>(args: Prisma.SelectSubset<T, JurisdictionUpdateArgs<ExtArgs>>): Prisma.Prisma__JurisdictionClient<runtime.Types.Result.GetResult<Prisma.$JurisdictionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends JurisdictionDeleteManyArgs>(args?: Prisma.SelectSubset<T, JurisdictionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends JurisdictionUpdateManyArgs>(args: Prisma.SelectSubset<T, JurisdictionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends JurisdictionUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, JurisdictionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$JurisdictionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends JurisdictionUpsertArgs>(args: Prisma.SelectSubset<T, JurisdictionUpsertArgs<ExtArgs>>): Prisma.Prisma__JurisdictionClient<runtime.Types.Result.GetResult<Prisma.$JurisdictionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends JurisdictionCountArgs>(args?: Prisma.Subset<T, JurisdictionCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], JurisdictionCountAggregateOutputType> : number>;
    aggregate<T extends JurisdictionAggregateArgs>(args: Prisma.Subset<T, JurisdictionAggregateArgs>): Prisma.PrismaPromise<GetJurisdictionAggregateType<T>>;
    groupBy<T extends JurisdictionGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: JurisdictionGroupByArgs['orderBy'];
    } : {
        orderBy?: JurisdictionGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, JurisdictionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetJurisdictionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: JurisdictionFieldRefs;
}
export interface Prisma__JurisdictionClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    tax_rates<T extends Prisma.Jurisdiction$tax_ratesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Jurisdiction$tax_ratesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TaxRatePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    orders<T extends Prisma.Jurisdiction$ordersArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Jurisdiction$ordersArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OrderOnJurisdictionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface JurisdictionFieldRefs {
    readonly id: Prisma.FieldRef<"Jurisdiction", 'Int'>;
    readonly name: Prisma.FieldRef<"Jurisdiction", 'String'>;
}
export type JurisdictionFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.JurisdictionSelect<ExtArgs> | null;
    omit?: Prisma.JurisdictionOmit<ExtArgs> | null;
    include?: Prisma.JurisdictionInclude<ExtArgs> | null;
    where: Prisma.JurisdictionWhereUniqueInput;
};
export type JurisdictionFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.JurisdictionSelect<ExtArgs> | null;
    omit?: Prisma.JurisdictionOmit<ExtArgs> | null;
    include?: Prisma.JurisdictionInclude<ExtArgs> | null;
    where: Prisma.JurisdictionWhereUniqueInput;
};
export type JurisdictionFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.JurisdictionSelect<ExtArgs> | null;
    omit?: Prisma.JurisdictionOmit<ExtArgs> | null;
    include?: Prisma.JurisdictionInclude<ExtArgs> | null;
    where?: Prisma.JurisdictionWhereInput;
    orderBy?: Prisma.JurisdictionOrderByWithRelationInput | Prisma.JurisdictionOrderByWithRelationInput[];
    cursor?: Prisma.JurisdictionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.JurisdictionScalarFieldEnum | Prisma.JurisdictionScalarFieldEnum[];
};
export type JurisdictionFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.JurisdictionSelect<ExtArgs> | null;
    omit?: Prisma.JurisdictionOmit<ExtArgs> | null;
    include?: Prisma.JurisdictionInclude<ExtArgs> | null;
    where?: Prisma.JurisdictionWhereInput;
    orderBy?: Prisma.JurisdictionOrderByWithRelationInput | Prisma.JurisdictionOrderByWithRelationInput[];
    cursor?: Prisma.JurisdictionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.JurisdictionScalarFieldEnum | Prisma.JurisdictionScalarFieldEnum[];
};
export type JurisdictionFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.JurisdictionSelect<ExtArgs> | null;
    omit?: Prisma.JurisdictionOmit<ExtArgs> | null;
    include?: Prisma.JurisdictionInclude<ExtArgs> | null;
    where?: Prisma.JurisdictionWhereInput;
    orderBy?: Prisma.JurisdictionOrderByWithRelationInput | Prisma.JurisdictionOrderByWithRelationInput[];
    cursor?: Prisma.JurisdictionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.JurisdictionScalarFieldEnum | Prisma.JurisdictionScalarFieldEnum[];
};
export type JurisdictionCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.JurisdictionSelect<ExtArgs> | null;
    omit?: Prisma.JurisdictionOmit<ExtArgs> | null;
    include?: Prisma.JurisdictionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.JurisdictionCreateInput, Prisma.JurisdictionUncheckedCreateInput>;
};
export type JurisdictionCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.JurisdictionCreateManyInput | Prisma.JurisdictionCreateManyInput[];
    skipDuplicates?: boolean;
};
export type JurisdictionCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.JurisdictionSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.JurisdictionOmit<ExtArgs> | null;
    data: Prisma.JurisdictionCreateManyInput | Prisma.JurisdictionCreateManyInput[];
    skipDuplicates?: boolean;
};
export type JurisdictionUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.JurisdictionSelect<ExtArgs> | null;
    omit?: Prisma.JurisdictionOmit<ExtArgs> | null;
    include?: Prisma.JurisdictionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.JurisdictionUpdateInput, Prisma.JurisdictionUncheckedUpdateInput>;
    where: Prisma.JurisdictionWhereUniqueInput;
};
export type JurisdictionUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.JurisdictionUpdateManyMutationInput, Prisma.JurisdictionUncheckedUpdateManyInput>;
    where?: Prisma.JurisdictionWhereInput;
    limit?: number;
};
export type JurisdictionUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.JurisdictionSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.JurisdictionOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.JurisdictionUpdateManyMutationInput, Prisma.JurisdictionUncheckedUpdateManyInput>;
    where?: Prisma.JurisdictionWhereInput;
    limit?: number;
};
export type JurisdictionUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.JurisdictionSelect<ExtArgs> | null;
    omit?: Prisma.JurisdictionOmit<ExtArgs> | null;
    include?: Prisma.JurisdictionInclude<ExtArgs> | null;
    where: Prisma.JurisdictionWhereUniqueInput;
    create: Prisma.XOR<Prisma.JurisdictionCreateInput, Prisma.JurisdictionUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.JurisdictionUpdateInput, Prisma.JurisdictionUncheckedUpdateInput>;
};
export type JurisdictionDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.JurisdictionSelect<ExtArgs> | null;
    omit?: Prisma.JurisdictionOmit<ExtArgs> | null;
    include?: Prisma.JurisdictionInclude<ExtArgs> | null;
    where: Prisma.JurisdictionWhereUniqueInput;
};
export type JurisdictionDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.JurisdictionWhereInput;
    limit?: number;
};
export type Jurisdiction$tax_ratesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type Jurisdiction$ordersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type JurisdictionDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.JurisdictionSelect<ExtArgs> | null;
    omit?: Prisma.JurisdictionOmit<ExtArgs> | null;
    include?: Prisma.JurisdictionInclude<ExtArgs> | null;
};
export {};
