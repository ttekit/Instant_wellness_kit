import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ProductPackage, Status } from 'src/generated/prisma/client';
import { CreateProductPackageDto } from './dto/create-product-package.dto';
import { UpdateProductPackageDto } from './dto/update-product-package.dto';
import { ProductPackageDetailsDto } from './dto/product-package-detail.dto';

@Injectable()
export class ProductPackegesService {
  constructor(private prisma: PrismaService) {}

  async create(createProductPackageDto: CreateProductPackageDto): Promise<ProductPackage> {
    const { productIds, ...productPackageData } = createProductPackageDto;

    if (productIds && productIds.length > 0) {
      const existingProducts = await this.prisma.product.findMany({
        where: {
          id: {
            in: productIds,
          },
        },
      });

      if (existingProducts.length !== productIds.length) {
        const foundProductIds = new Set(existingProducts.map((p) => p.id));
        const nonExistentProductIds = productIds.filter(
          (id) => !foundProductIds.has(id),
        );
        throw new NotFoundException(
          `Products with IDs ${nonExistentProductIds.join(', ')} not found.`,
        );
      }
    }

    try {
      return await this.prisma.$transaction(async (prisma) => {
        const productPackage = await prisma.productPackage.create({
          data: productPackageData,
        });

        if (productIds && productIds.length > 0) {
          const productOnPackageData = productIds.map((productId) => ({
            packageId: productPackage.id,
            productId: productId,
          }));
          await prisma.productOnPackage.createMany({
            data: productOnPackageData,
          });
        }
        return productPackage;
      });
    } catch (error) {
      throw new ConflictException('Error creating product package');
    }
  }

  async findAll(): Promise<ProductPackage[]> {
    return this.prisma.productPackage.findMany({
      include: {
        products: {
          include: {
            product: true,
          },
        },
      },
    });
  }

  async findOne(id: number): Promise<ProductPackageDetailsDto | null> {
    return this.getProductPackegeWithJurisdictionAndProductsById(id);
  }

  async update(id: number, updateProductPackageDto: UpdateProductPackageDto): Promise<ProductPackageDetailsDto | null> {
    console.log(updateProductPackageDto);
    const { productIds, ...productPackageData } = updateProductPackageDto;

    if (productIds !== undefined && productIds.length > 0) {
      const existingProducts = await this.prisma.product.findMany({
        where: {
          id: {
            in: productIds,
          },
        },
      });

      if (existingProducts.length !== productIds.length) {
        const foundProductIds = new Set(existingProducts.map((p) => p.id));
        const nonExistentProductIds = productIds.filter(
          (productId) => !foundProductIds.has(productId),
        );
        throw new NotFoundException(
          `Products with IDs ${nonExistentProductIds.join(', ')} not found.`,
        );
      }
    }

    await this.prisma.$transaction(async (prisma) => {
      await prisma.productPackage.update({
        where: { id },
        data: productPackageData,
      });

      if (productIds !== undefined) {
        await prisma.productOnPackage.deleteMany({
          where: { packageId: id },
        });

        if (productIds.length > 0) {
          const productOnPackageData = productIds.map((productId) => ({
            packageId: id,
            productId: productId,
          }));
          await prisma.productOnPackage.createMany({
            data: productOnPackageData,
          });
        }
      }
    });

    return this.getProductPackegeWithJurisdictionAndProductsById(id);
  }

  async remove(id: number): Promise<ProductPackage> {
    await this.prisma.productOnPackage.deleteMany({
      where: { packageId: id },
    });
    return this.prisma.productPackage.delete({
      where: { id },
    });
  }

  async block(id: number): Promise<ProductPackageDetailsDto | null> {
    const existingPackage = await this.prisma.productPackage.findUnique({
      where: { id },
    });

    if (!existingPackage) {
      throw new NotFoundException(`Product Package with ID ${id} not found.`);
    }

    await this.prisma.productPackage.update({
      where: { id },
      data: {
        status: Status.BLOCKED,
      },
    });
    return this.getProductPackegeWithJurisdictionAndProductsById(id);
  }

  async unblock(id: number): Promise<ProductPackageDetailsDto | null> {
    const existingPackage = await this.prisma.productPackage.findUnique({
      where: { id },
    });

    if (!existingPackage) {
      throw new NotFoundException(`Product Package with ID ${id} not found.`);
    }

    await this.prisma.productPackage.update({
      where: { id },
      data: {
        status: Status.PENDING,
      },
    });
    return this.getProductPackegeWithJurisdictionAndProductsById(id);
  }

  async getProductPackegeWithJurisdictionAndProducts(): Promise<ProductPackageDetailsDto[]> {
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
          uniqueJurisdictions.set(jurisdiction.id, {
            id: jurisdiction.id,
            name: jurisdiction.name,
          });
        });
      });

      return {
        id: pkg.id,
        package: pkg.package,
        price: Number(pkg.price),
        status: pkg.status,
        tax_rate: Number(pkg.taxRate),
        jurisdictions: Array.from(uniqueJurisdictions.values()),
        products: productsWithJurisdictions.map(
          ({ jurisdictions, ...productWithoutJurisdictions }) =>
            productWithoutJurisdictions,
        ),
      };
    });
  }

  async getProductPackegeWithJurisdictionAndProductsById(id: number): Promise<ProductPackageDetailsDto | null> {
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
        uniqueJurisdictions.set(jurisdiction.id, {
          id: jurisdiction.id,
          name: jurisdiction.name,
        });
      });
    });

    return {
      id: pkg.id,
      package: pkg.package,
      price: Number(pkg.price),
      status: pkg.status,
      tax_rate: Number(pkg.taxRate),
      jurisdictions: Array.from(uniqueJurisdictions.values()),
      products: productsWithJurisdictions.map(
        ({ jurisdictions, ...productWithoutJurisdictions }) =>
          productWithoutJurisdictions,
      ),
    };
  }
}
