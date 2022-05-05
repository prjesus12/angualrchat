/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UserControllerService } from './UserController.service';

describe('Service: UserController', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserControllerService]
    });
  });

  it('should ...', inject([UserControllerService], (service: UserControllerService) => {
    expect(service).toBeTruthy();
  }));
});
