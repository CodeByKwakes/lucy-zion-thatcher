import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { blogExistsGuard } from './blog-exists.guard';

describe('blogExistsGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => blogExistsGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
