import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainSearchComponent } from './main-search.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

describe('MainSearchComponent', () => {
    let component: MainSearchComponent;
    let fixture: ComponentFixture<MainSearchComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MainSearchComponent],
            imports: [RouterTestingModule, FormsModule, HttpClientModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MainSearchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
