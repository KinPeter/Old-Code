import { TestBed } from '@angular/core/testing';

import { FieldValidatorService } from './field-validator.service';

describe('FieldValidatorService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: []
    }));

    it('should be created', () => {
        const service: FieldValidatorService = TestBed.get(FieldValidatorService);
        expect(service).toBeTruthy();
    });
});
