import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

    scrolled: boolean;

    constructor(public router: Router) { }

    toHomeTop(): void {
        if (this.router.url === '/') {
            document.querySelector('app-header').scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            this.router.navigate(['/']);
            window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
        }
    }

    scrollToContacts(): void {
        document.querySelector('app-footer').scrollIntoView({behavior: 'smooth'});
    }

    toAboutSection(): void {
        let aboutSection: HTMLElement = document.querySelector('app-about-section');
        if (this.router.url === '/') {
            // document.querySelector('app-about-section').scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' });
            window.scrollTo({top: aboutSection.offsetTop - 50, left: 0, behavior: 'smooth'});
        } else {
            this.router.navigate(['/']).then(() => {
                // document.querySelector('app-about-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
                aboutSection = document.querySelector('app-about-section');
                window.scrollTo({ top: aboutSection.offsetTop - 50, left: 0, behavior: 'smooth' });
            });
        }
    }

    ngOnInit(): void {
        window.addEventListener('scroll', () => { this.scrollCheck(); }, false);
    }

    private scrollCheck(): void {
        this.scrolled = window.scrollY > 200;
    }

}
