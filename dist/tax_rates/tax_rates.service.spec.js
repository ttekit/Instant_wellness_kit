"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const tax_rates_service_1 = require("./tax_rates.service");
describe('TaxRatesService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [tax_rates_service_1.TaxRatesService],
        }).compile();
        service = module.get(tax_rates_service_1.TaxRatesService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=tax_rates.service.spec.js.map