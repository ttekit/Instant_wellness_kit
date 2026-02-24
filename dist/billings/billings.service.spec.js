"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const billings_service_1 = require("./billings.service");
describe('BillingsService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [billings_service_1.BillingsService],
        }).compile();
        service = module.get(billings_service_1.BillingsService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=billings.service.spec.js.map