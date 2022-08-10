import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutSectionComponent } from './about-section.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('AboutSectionComponent', () => {
    let component: AboutSectionComponent;
    let fixture: ComponentFixture<AboutSectionComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AboutSectionComponent],
            imports: [RouterTestingModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AboutSectionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
