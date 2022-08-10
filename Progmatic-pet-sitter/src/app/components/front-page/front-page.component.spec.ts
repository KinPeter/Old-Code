import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontPageComponent } from './front-page.component';
import { MainSearchComponent } from './main-search/main-search.component';
import { AboutSectionComponent } from './about-section/about-section.component';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

describe('FrontPageComponent', () => {
    let component: FrontPageComponent;
    let fixture: ComponentFixture<FrontPageComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, RouterTestingModule, HttpClientModule],
            declarations: [FrontPageComponent, MainSearchComponent, AboutSectionComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FrontPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
