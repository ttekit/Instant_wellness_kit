"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const billings_controller_1 = require("./billings.controller");
const billings_service_1 = require("./billings.service");
describe('BillingsController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [billings_controller_1.BillingsController],
            providers: [billings_service_1.BillingsService],
        }).compile();
        controller = module.get(billings_controller_1.BillingsController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=billings.controller.spec.js.map