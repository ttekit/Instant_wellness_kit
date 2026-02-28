import { Test, TestingModule } from '@nestjs/testing';
import { ProductPackegesService } from './product-packeges.service';

describe('ProductPackegesService', () => {
  let service: ProductPackegesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductPackegesService],
    }).compile();

    service = module.get<ProductPackegesService>(ProductPackegesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
