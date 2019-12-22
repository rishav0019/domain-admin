import { TestBed } from '@angular/core/testing';

import { TitlebarService } from './titlebar.service';

describe('TitlebarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TitlebarService = TestBed.get(TitlebarService);
    expect(service).toBeTruthy();
  });
});
