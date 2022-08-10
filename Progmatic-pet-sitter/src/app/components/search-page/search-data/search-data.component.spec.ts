import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchDataComponent } from './search-data.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('SearchDataComponent', () => {
    let component: SearchDataComponent;
    let fixture: ComponentFixture<SearchDataComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SearchDataComponent],
            imports: [FormsModule, HttpClientModule, RouterTestingModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SearchDataComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
