import { TestBed } from '@angular/core/testing';

import { CollectionAgentService } from './collection-agent.service';

describe('CollectionAgentService', () => {
  let service: CollectionAgentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CollectionAgentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
