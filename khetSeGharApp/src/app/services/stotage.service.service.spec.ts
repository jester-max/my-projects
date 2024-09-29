import { TestBed } from '@angular/core/testing';

import { StotageServiceService } from './stotage.service.service';

describe('StotageServiceService', () => {
  let service: StotageServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StotageServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
