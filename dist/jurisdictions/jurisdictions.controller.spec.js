"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const jurisdictions_controller_1 = require("./jurisdictions.controller");
const jurisdictions_service_1 = require("./jurisdictions.service");
describe('JurisdictionsController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [jurisdictions_controller_1.JurisdictionsController],
            providers: [jurisdictions_service_1.JurisdictionsService],
        }).compile();
        controller = module.get(jurisdictions_controller_1.JurisdictionsController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=jurisdictions.controller.spec.js.map