import { TestBed } from '@angular/core/testing';

import { ServerLoadService } from './server-load.service';

describe('ServerLoadService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServerLoadService = TestBed.get(ServerLoadService);
    expect(service).toBeTruthy();
  });
});
