import { TestBed } from '@angular/core/testing';

import { AdminDeactivateGuard } from './admin-deactivate.guard';

describe('AdminDeactivateGuard', () => {
  let guard: AdminDeactivateGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AdminDeactivateGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
