import { TestBed } from '@angular/core/testing';

import { RamdomImageService } from './ramdom-image.service';

describe('RamdomImageService', () => {
  let service: RamdomImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RamdomImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
