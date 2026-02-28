import { config } from 'dotenv';
config();

import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from '../src/generated/prisma/client';

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

console.log("DATABASE_URL status:", process.env.DATABASE_URL ? "Found" : "Missing");


const prisma = new PrismaClient({ adapter });
async function main(): Promise<void> {
    const jurisdictionsData = [
        {
            name: 'New York',
            type: 'State',
            fipsCode: '36',
            minLat: 40.496,
            maxLat: 45.011,
            minLong: -79.762,
            maxLong: -71.856,
            tax_rates: {
                create: [
                    {
                        rate: 0.04,
                        local_rate: 0.04875,
                        mctd: 0.00375,
                        composite: 0.08875,
                        type: 1.0,
                    }
                ]
            }
        },
        {
            name: 'California',
            type: 'State',
            fipsCode: '06',
            minLat: 32.534,
            maxLat: 42.009,
            minLong: -124.409,
            maxLong: -114.131,
            tax_rates: {
                create: [
                    {
                        rate: 0.0725,
                        local_rate: 0.015,
                        mctd: 0.0,
                        composite: 0.0875,
                        type: 1.0,
                    }
                ]
            }
        },
        {
            name: 'Texas',
            type: 'State',
            fipsCode: '48',
            minLat: 25.837,
            maxLat: 36.500,
            minLong: -106.645,
            maxLong: -93.508,
            tax_rates: {
                create: [
                    {
                        rate: 0.0625,
                        local_rate: 0.02,
                        mctd: 0.0,
                        composite: 0.0825,
                        type: 1.0,
                    }
                ]
            }
        },
        {
            name: 'Florida',
            type: 'State',
            fipsCode: '12',
            minLat: 24.521,
            maxLat: 31.000,
            minLong: -87.634,
            maxLong: -79.974,
            tax_rates: {
                create: [
                    {
                        rate: 0.06,
                        local_rate: 0.0105,
                        mctd: 0.0,
                        composite: 0.0705,
                        type: 1.0,
                    }
                ]
            }
        }
    ];

    for (const data of jurisdictionsData) {
        const existingJurisdiction = await prisma.jurisdiction.findFirst({
            where: { name: data.name }
        });

        if (!existingJurisdiction) {
            await prisma.jurisdiction.create({
                data,
            });
        }
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });