import { Test, TestingModule } from '@nestjs/testing';
import { JurisdictionsController } from './jurisdictions.controller';
import { JurisdictionsService } from './jurisdictions.service';

describe('JurisdictionsController', () => {
  let controller: JurisdictionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JurisdictionsController],
      providers: [JurisdictionsService],
    }).compile();

    controller = module.get<JurisdictionsController>(JurisdictionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
