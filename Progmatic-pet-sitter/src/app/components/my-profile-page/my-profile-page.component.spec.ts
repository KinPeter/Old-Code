import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProfilePageComponent } from './my-profile-page.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';

describe('MyProfilePageComponent', () => {
    let component: MyProfilePageComponent;
    let fixture: ComponentFixture<MyProfilePageComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MyProfilePageComponent],
            imports: [HttpClientModule, RouterTestingModule, FormsModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MyProfilePageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
