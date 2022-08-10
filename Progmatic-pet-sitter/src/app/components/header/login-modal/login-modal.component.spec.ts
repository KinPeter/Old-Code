import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsModule } from '@angular/forms';
import { SpinnerComponent } from '../../ui/spinner/spinner.component';
import { LoginModalComponent } from './login-modal.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DebugElement } from '@angular/core';

describe('LoginModalComponent', () => {
    let component: LoginModalComponent;
    let fixture: ComponentFixture<LoginModalComponent>;
    let debugElement: DebugElement;
    let element: HTMLElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LoginModalComponent, SpinnerComponent],
            imports: [FormsModule, BrowserAnimationsModule],
            providers: [HttpClient, HttpHandler]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginModalComponent);
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;
        element = debugElement.nativeElement;
        fixture.detectChanges();
    });

    afterEach(() => {
        document.body.removeChild(element);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should validate login data', () => {
        component.setLoginData('valaki@example.com', 'asdfg');
        component.sendLoginData();
        expect(component.getIsEmailValid()).toEqual(true);
        expect(component.getIsPasswordValid()).toEqual(true);

        component.setLoginData('valaki@example', 'asdfg');
        component.sendLoginData();
        expect(component.getIsEmailValid()).toEqual(false);
        expect(component.getIsPasswordValid()).toEqual(true);

        component.setLoginData('valaki@example', '');
        component.sendLoginData();
        expect(component.getIsEmailValid()).toEqual(false);
        expect(component.getIsPasswordValid()).toEqual(false);

        component.setLoginData('valaki example.com', '');
        component.sendLoginData();
        expect(component.getIsEmailValid()).toEqual(false);
        expect(component.getIsPasswordValid()).toEqual(false);

        component.setLoginData('@example.com', 'asdasd');
        component.sendLoginData();
        expect(component.getIsEmailValid()).toEqual(false);
        expect(component.getIsPasswordValid()).toEqual(true);
    });

    it('should reset error and success flags', () => {
        component.setErrorSuccessFlags(401, false);
        expect(component.getLoginError()).toEqual(401);
        expect(component.getLoginSuccess()).toEqual(false);
        component.closeMe();
        expect(component.getLoginError()).toEqual(-1);
        expect(component.getLoginSuccess()).toEqual(false);

        component.setErrorSuccessFlags(-1, true);
        expect(component.getLoginError()).toEqual(-1);
        expect(component.getLoginSuccess()).toEqual(true);
        component.closeMe();
        expect(component.getLoginError()).toEqual(-1);
        expect(component.getLoginSuccess()).toEqual(false);
    });
});
