"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const tax_rates_controller_1 = require("./tax_rates.controller");
const tax_rates_service_1 = require("./tax_rates.service");
describe('TaxRatesController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [tax_rates_controller_1.TaxRatesController],
            providers: [tax_rates_service_1.TaxRatesService],
        }).compile();
        controller = module.get(tax_rates_controller_1.TaxRatesController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=tax_rates.controller.spec.js.map