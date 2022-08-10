import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginModalComponent } from './login-modal/login-modal.component';
import { SpinnerComponent } from '../ui/spinner/spinner.component';

describe('HeaderComponent', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [HeaderComponent, NavbarComponent, LoginModalComponent, SpinnerComponent],
            imports: [RouterTestingModule, HttpClientModule, FormsModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set userLoggedIn to false if no user', () => {
        expect(component.getUserLoggedIn()).toBeFalsy();
    });

    it('should render buttons according to user login status', () => {
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('.my-head-info a:first-of-type').textContent).toContain('Bejelentkezés');
        expect(compiled.querySelector('.my-head-info a:last-of-type').textContent).toContain('Regisztráció');
        component.setUserLoggedIn(true);
        fixture.detectChanges();
        expect(compiled.querySelector('.my-head-info a:first-of-type').textContent).toContain('Profilom');
        expect(compiled.querySelector('.my-head-info a:last-of-type').textContent).toContain('Kijelentkezés');
        component.setUserLoggedIn(false);
        fixture.detectChanges();
        expect(compiled.querySelector('.my-head-info a:first-of-type').textContent).toContain('Bejelentkezés');
        expect(compiled.querySelector('.my-head-info a:last-of-type').textContent).toContain('Regisztráció');
    });
});
