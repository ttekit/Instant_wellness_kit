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
exports.TaxRatesController = void 0;
const common_1 = require("@nestjs/common");
const tax_rates_service_1 = require("./tax_rates.service");
let TaxRatesController = class TaxRatesController {
    taxRatesService;
    constructor(taxRatesService) {
        this.taxRatesService = taxRatesService;
    }
};
exports.TaxRatesController = TaxRatesController;
exports.TaxRatesController = TaxRatesController = __decorate([
    (0, common_1.Controller)('tax-rates'),
    __metadata("design:paramtypes", [tax_rates_service_1.TaxRatesService])
], TaxRatesController);
//# sourceMappingURL=tax_rates.controller.js.map