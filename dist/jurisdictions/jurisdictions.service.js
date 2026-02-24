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
exports.JurisdictionsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const common_2 = require("@nestjs/common");
const create_jurisdictions_dto_1 = require("./dto/create-jurisdictions.dto");
let JurisdictionsService = class JurisdictionsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createJurisdictionsDto) {
        return this.prisma.jurisdiction.create({
            data: {
                name: create_jurisdictions_dto_1.CreateJurisdictionDto.name,
            },
        });
    }
    async findAll() {
        return this.prisma.jurisdiction.findMany();
    }
    async findOne(id) {
        const jurisdiction = await this.prisma.jurisdiction.findUnique({
            where: { id },
            include: {
                tax_rates: true,
            }
        });
        if (!jurisdiction) {
            throw new common_2.NotFoundException(`Jurisdiction information with ID ${id} not found.`);
        }
        return jurisdiction;
    }
    async update(id, updateJurisdictionDto) {
        const existingJurisdictio = await this.prisma.jurisdiction.findUnique({
            where: { id },
        });
        if (!existingJurisdictio) {
            throw new common_2.NotFoundException(`Jurisdiction information with ID ${id} not found.`);
        }
        return this.prisma.jurisdiction.update({
            where: { id },
            data: updateJurisdictionDto,
        });
    }
    async remove(id) {
        const jurisdiction = await this.prisma.billing.findUnique({
            where: { id },
        });
        if (!jurisdiction) {
            throw new common_2.NotFoundException(`Jurisdiction information with ID ${id} not found.`);
        }
        return this.prisma.jurisdiction.delete({
            where: { id },
        });
    }
};
exports.JurisdictionsService = JurisdictionsService;
exports.JurisdictionsService = JurisdictionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], JurisdictionsService);
//# sourceMappingURL=jurisdictions.service.js.map