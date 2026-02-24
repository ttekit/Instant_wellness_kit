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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JurisdictionsController = void 0;
const common_1 = require("@nestjs/common");
const jurisdictions_service_1 = require("./jurisdictions.service");
const create_jurisdictions_dto_1 = require("./dto/create-jurisdictions.dto");
const update_jurisdictions_dto_1 = require("./dto/update-jurisdictions.dto");
const swagger_1 = require("@nestjs/swagger");
let JurisdictionsController = class JurisdictionsController {
    jurisdictionsService;
    constructor(jurisdictionsService) {
        this.jurisdictionsService = jurisdictionsService;
    }
    create(createJurisdictionDto) {
        return this.jurisdictionsService.create(createJurisdictionDto);
    }
    findAll() {
        return this.jurisdictionsService.findAll();
    }
    findOne(id) {
        return this.jurisdictionsService.findOne(id);
    }
    update(id, updateJurisdictionDto) {
        return this.jurisdictionsService.update(id, updateJurisdictionDto);
    }
    remove(id) {
        return this.jurisdictionsService.remove(id);
    }
};
exports.JurisdictionsController = JurisdictionsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Create new jurisdiction' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'The jurisdiction has been successfully created.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request.' }),
    (0, swagger_1.ApiBody)({ type: create_jurisdictions_dto_1.CreateJurisdictionDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_jurisdictions_dto_1.CreateJurisdictionDto]),
    __metadata("design:returntype", void 0)
], JurisdictionsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Retrieve all jurisdictions' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'All jurisdictions retrieved successfully.' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], JurisdictionsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Retrieve jurisdiction by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Jurisdiction retrieved successfully.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Jurisdiction not found.' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: Number, description: 'The ID of the jurisdiction' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], JurisdictionsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update jurisdiction by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'The jurisdiction has been successfully updated.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Jurisdiction not found.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request.' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: Number, description: 'The ID of the jurisdiction' }),
    (0, swagger_1.ApiBody)({ type: update_jurisdictions_dto_1.UpdateJurisdictionDto }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_jurisdictions_dto_1.UpdateJurisdictionDto]),
    __metadata("design:returntype", void 0)
], JurisdictionsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Delete jurisdiction by ID' }),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'The jurisdiction has been successfully deleted.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Jurisdiction not found.' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: Number, description: 'The ID of the jurisdiction' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], JurisdictionsController.prototype, "remove", null);
exports.JurisdictionsController = JurisdictionsController = __decorate([
    (0, swagger_1.ApiTags)('jurisdictions'),
    (0, common_1.Controller)('jurisdictions'),
    __metadata("design:paramtypes", [jurisdictions_service_1.JurisdictionsService])
], JurisdictionsController);
//# sourceMappingURL=jurisdictions.controller.js.map