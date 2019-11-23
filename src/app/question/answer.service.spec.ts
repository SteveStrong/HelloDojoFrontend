import { async,TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AnswerService } from './answer.service';

describe('AnswerService', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),
      ],
    })
    .compileComponents();
  }));

  it('should be created', () => {
    const service: AnswerService = TestBed.get(AnswerService);
    expect(service).toBeTruthy();
  });
});
