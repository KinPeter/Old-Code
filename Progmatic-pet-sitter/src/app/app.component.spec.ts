import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/header/navbar/navbar.component';
import { LoginModalComponent } from './components/header/login-modal/login-modal.component';
import { FormsModule } from '@angular/forms';
import { SpinnerComponent } from './components/ui/spinner/spinner.component';
import { HttpClientModule } from '@angular/common/http';

describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule, FormsModule, HttpClientModule
            ],
            declarations: [
                AppComponent, HeaderComponent, FooterComponent, NavbarComponent, LoginModalComponent, SpinnerComponent
            ],
        }).compileComponents();
    }));

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    });

});
