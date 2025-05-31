// Import testing utilities from NestJS
import { Test, TestingModule } from '@nestjs/testing';
// Import the service we want to test
import { ClaudeService } from './claude.service';

describe('ClaudeService', () => {
  let service: ClaudeService;

  // Before each test, create a new testing module and initialize the service
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClaudeService], // Register the service as a provider
    }).compile();

    // Get an instance of the service from the compiled module
    service = module.get<ClaudeService>(ClaudeService);
  });

  // Basic test to check that the service is properly defined (i.e., it was instantiated)
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
