"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BillingsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let BillingsService = class BillingsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createBillingDto) {
        const user = await this.prisma.user.findUnique({ where: { id: createBillingDto.userId } });
        if (!user) {
            throw new common_1.BadRequestException(`User with ID ${createBillingDto.userId} not found.`);
        }
        return this.prisma.billing.create({
            data: {
                userId: createBillingDto.userId,
                paymentMethod: createBillingDto.paymentMethod,
                details: createBillingDto.details,
            },
        });
    }
    async findAll() {
        return this.prisma.billing.findMany();
    }
    async findOne(id) {
        const billing = await this.prisma.billing.findUnique({
            where: { id },
        });
        if (!billing) {
            throw new common_1.NotFoundException(`Billing information with ID ${id} not found.`);
        }
        return billing;
    }
    async update(id, updateBillingDto) {
        const existingBilling = await this.prisma.billing.findUnique({
            where: { id },
        });
        if (!existingBilling) {
            throw new common_1.NotFoundException(`Billing information with ID ${id} not found.`);
        }
        if (updateBillingDto.userId) {
            const user = await this.prisma.user.findUnique({ where: { id: updateBillingDto.userId } });
            if (!user) {
                throw new common_1.BadRequestException(`User with ID ${updateBillingDto.userId} not found.`);
            }
        }
        return this.prisma.billing.update({
            where: { id },
            data: updateBillingDto,
        });
    }
    async remove(id) {
        const billing = await this.prisma.billing.findUnique({
            where: { id },
        });
        if (!billing) {
            throw new common_1.NotFoundException(`Billing information with ID ${id} not found.`);
        }
        return this.prisma.billing.delete({
            where: { id },
        });
    }
};
exports.BillingsService = BillingsService;
exports.BillingsService = BillingsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BillingsService);
//# sourceMappingURL=billings.service.js.map