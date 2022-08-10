import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchListComponent } from './search-list.component';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { SearchListItemComponent } from './search-list-item/search-list-item.component';
import { HttpClientModule } from '@angular/common/http';

describe('SearchListComponent', () => {
    let component: SearchListComponent;
    let fixture: ComponentFixture<SearchListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SearchListComponent, SearchListItemComponent],
            imports: [HttpClientModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SearchListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
