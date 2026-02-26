import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ProductPackage, Prisma, Status } from 'src/generated/prisma/client';
import { CreateProductPackageDto } from './dto/create-product-package.dto';
import { UpdateProductPackageDto } from './dto/update-product-package.dto';

@Injectable()
export class ProductPackegesService {
  constructor(private prisma: PrismaService) {}

  async create(createProductPackageDto: CreateProductPackageDto): Promise<any> {
    const { productIds, ...packageData } = createProductPackageDto;

    if (productIds && productIds.length > 0) {
      const existingProducts = await this.prisma.product.findMany({
        where: {
          id: {
            in: productIds,
          },
        },
      });

      if (existingProducts.length !== productIds.length) {
        const foundProductIds = new Set(existingProducts.map(p => p.id));
        const nonExistentProductIds = productIds.filter(id => !foundProductIds.has(id));
        throw new NotFoundException(`Products with IDs ${nonExistentProductIds.join(', ')} not found.`);
      }
    }

    const newPackage = await this.prisma.productPackage.create({
      data: {
        ...packageData,
        ...(productIds && productIds.length > 0
          ? {
              products: {
                create: productIds.map((productId) => ({
                  product: {
                    connect: { id: productId },
                  },
                })),
              },
            }
          : {}),
      },
    });

    return this.getProductPackegeWithJurisdictionAndProductsById(newPackage.id);
  }

  async findAll(): Promise<ProductPackage[]> {
    return this.prisma.productPackage.findMany();
  }

  async findOne(id: number): Promise<ProductPackage | null> {
    return this.prisma.productPackage.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateProductPackageDto: UpdateProductPackageDto): Promise<ProductPackage> {
    const { productIds, ...packageData } = updateProductPackageDto;

    if (productIds && productIds.length > 0) {
      const existingProducts = await this.prisma.product.findMany({
        where: {
          id: {
            in: productIds,
          },
        },
      });

      if (existingProducts.length !== productIds.length) {
        const foundProductIds = new Set(existingProducts.map(p => p.id));
        const nonExistentProductIds = productIds.filter(id => !foundProductIds.has(id));
        throw new NotFoundException(`Products with IDs ${nonExistentProductIds.join(', ')} not found.`);
      }
    }

    return this.prisma.productPackage.update({
      where: { id },
      data: {
        ...packageData,
        ...(productIds !== undefined
          ? {
              products: {
                deleteMany: {}, // Delete all existing ProductOnPackage relations
                create: productIds.map((productId) => ({
                  product: {
                    connect: { id: productId },
                  },
                })),
              },
            }
          : {}),
      },
    });
  }

  async remove(id: number): Promise<ProductPackage> {
    return this.prisma.productPackage.delete({
      where: { id },
    });
  }

  async block(id: number): Promise<ProductPackage> {
    const existingPackage = await this.prisma.productPackage.findUnique({
      where: { id },
    });

    if (!existingPackage) {
      throw new NotFoundException(`Product Package with ID ${id} not found.`);
    }

    return this.prisma.productPackage.update({
      where: { id },
      data: {
        status: Status.BLOCKED,
      },
    });
  }

  async unblock(id: number): Promise<ProductPackage> {
    const existingPackage = await this.prisma.productPackage.findUnique({
      where: { id },
    });

    if (!existingPackage) {
      throw new NotFoundException(`Product Package with ID ${id} not found.`);
    }

    return this.prisma.productPackage.update({
      where: { id },
      data: {
        status: Status.PENDING,
      },
    });
  }

  async getProductPackegeWithJurisdictionAndProducts() {
    const packages = await this.prisma.productPackage.findMany({
      include: {
        products: {
          select: {
            product: {
              select: {
                id: true,
                product: true,
                jurisdictions: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    return packages.map((pkg) => {
      const productsWithJurisdictions = pkg.products.map((pp) => pp.product);
      const uniqueJurisdictions = new Map();
      productsWithJurisdictions.forEach((product) => {
        product.jurisdictions.forEach((jurisdiction) => {
          uniqueJurisdictions.set(jurisdiction.id, { id: jurisdiction.id, name: jurisdiction.name });
        });
      });

      return {
        id: pkg.id,
        package: pkg.package,
        price: pkg.price,
        status: pkg.status,
        tax_rate: pkg.taxRate,
        jurisdictions: Array.from(uniqueJurisdictions.values()),
        products: productsWithJurisdictions.map(({ jurisdictions, ...productWithoutJurisdictions }) => productWithoutJurisdictions),
      };
    });
  }

  async getProductPackegeWithJurisdictionAndProductsById(id: number) {
    const pkg = await this.prisma.productPackage.findUnique({
      where: { id },
      include: {
        products: {
          select: {
            product: {
              select: {
                id: true,
                product: true,
                jurisdictions: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!pkg) {
      return null;
    }

    const productsWithJurisdictions = pkg.products.map((pp) => pp.product);
    const uniqueJurisdictions = new Map();
    productsWithJurisdictions.forEach((product) => {
      product.jurisdictions.forEach((jurisdiction) => {
        uniqueJurisdictions.set(jurisdiction.id, { id: jurisdiction.id, name: jurisdiction.name });
      });
    });

    return {
      id: pkg.id,
      package: pkg.package,
      price: pkg.price,
      status: pkg.status,
      tax_rate: pkg.taxRate,
      jurisdictions: Array.from(uniqueJurisdictions.values()),
      products: productsWithJurisdictions.map(({ jurisdictions, ...productWithoutJurisdictions }) => productWithoutJurisdictions),
    };
  }
}
