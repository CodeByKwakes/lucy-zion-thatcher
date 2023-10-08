import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { blogsGuard } from './blogs.guard';

describe('blogsGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => blogsGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
