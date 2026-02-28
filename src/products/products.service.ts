import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    const { jurisdictionIds, ...productData } = createProductDto;
    return this.prisma.product.create({
      data: {
        ...productData,
        jurisdictions: {
          connect: jurisdictionIds?.map((id) => ({ id })),
        },
      },
    });
  }

  async findAll() {
    return this.prisma.product.findMany();
  }

  async findOne(id: number) {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async getProductWithJurisdictions(id: number) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: {
        jurisdictions: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return {
      product: product.product,
      price: product.price,
      status: product.status,
      jurisdictions: product.jurisdictions.map((j) => j.name),
    };
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const { jurisdictionIds, ...productData } = updateProductDto;

    const product = await this.prisma.product.update({
      where: { id },
      data: {
        ...productData,
        jurisdictions: {
          set: jurisdictionIds?.map((id) => ({ id })),
        },
      },
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async remove(id: number) {
    const product = await this.prisma.product.delete({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }
}
