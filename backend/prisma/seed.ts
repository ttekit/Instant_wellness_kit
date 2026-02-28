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

    const adminRole = await prisma.role.upsert({
        where: { name: 'Admin' },
        update: {},
        create: {
            name: 'Admin',
            description: 'System administrator with full access',
            permissions: { all: true }
        }
    });

    const userRole = await prisma.role.upsert({
        where: { name: 'User' },
        update: {},
        create: {
            name: 'User',
            description: 'Regular customer',
            permissions: { all: false, canOrder: true }
        }
    });


    const adminUser = await prisma.user.findUnique({
        where: { email: 'admin@test.com' }
    });

    if (!adminUser) {
        await prisma.user.create({
            data: {
                name: 'Admin',
                surname: 'Test',
                email: 'admin@test.com',
                password: 'admin_password_hash',
                roleId: adminRole.id
            }
        });
        console.log('Admin user created');
    }

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