import { Test, TestingModule } from '@nestjs/testing';
import { ProductPackegesController } from './product-packeges.controller';
import { ProductPackegesService } from './product-packeges.service';

describe('ProductPackegesController', () => {
  let controller: ProductPackegesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductPackegesController],
      providers: [ProductPackegesService],
    }).compile();

    controller = module.get<ProductPackegesController>(ProductPackegesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
