import { Test, TestingModule } from '@nestjs/testing';
import { DataProcessController } from './data-process.controller';
import { DataProcessService } from './data-process.service';

describe('DataProcessController', () => {
  let controller: DataProcessController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DataProcessController],
      providers: [DataProcessService],
    }).compile();

    controller = module.get<DataProcessController>(DataProcessController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
