import { Test, TestingModule } from '@nestjs/testing';
import { JurisdictionsService } from './jurisdictions.service';

describe('JurisdictionsService', () => {
  let service: JurisdictionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JurisdictionsService],
    }).compile();

    service = module.get<JurisdictionsService>(JurisdictionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
