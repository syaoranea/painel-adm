/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FotoService } from './foto.service';

describe('Service: Foto', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FotoService]
    });
  });

  it('should ...', inject([FotoService], (service: FotoService) => {
    expect(service).toBeTruthy();
  }));
});
