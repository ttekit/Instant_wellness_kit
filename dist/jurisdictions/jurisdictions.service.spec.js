"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const jurisdictions_service_1 = require("./jurisdictions.service");
describe('JurisdictionsService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [jurisdictions_service_1.JurisdictionsService],
        }).compile();
        service = module.get(jurisdictions_service_1.JurisdictionsService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=jurisdictions.service.spec.js.map