import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SitterProfilePageComponent } from './sitter-profile-page.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';

describe('SitterProfilePageComponent', () => {
    let component: SitterProfilePageComponent;
    let fixture: ComponentFixture<SitterProfilePageComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SitterProfilePageComponent],
            imports: [RouterTestingModule, FormsModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SitterProfilePageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
