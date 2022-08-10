import { TestBed } from '@angular/core/testing';

import { SearchDataTransferService } from './search-data-transfer.service';
import { HttpClientModule } from '@angular/common/http';

describe('SearchDataTransferService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [HttpClientModule]
    }));

    it('should be created', () => {
        const service: SearchDataTransferService = TestBed.get(SearchDataTransferService);
        expect(service).toBeTruthy();
    });
});
