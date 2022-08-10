import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

    constructor(private router: Router) { }

    toHomeTop(): void {
        if (this.router.url === '/') {
            document.querySelector('app-header').scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            this.router.navigate(['/']);
            window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
        }
    }



    toAboutSection(): void {
        let aboutSection: HTMLElement = document.querySelector('app-about-section');
        if (this.router.url === '/') {
            window.scrollTo({top: aboutSection.offsetTop - 50, left: 0, behavior: 'smooth'});
        } else {
            this.router.navigate(['/']).then(() => {
                aboutSection = document.querySelector('app-about-section');
                window.scrollTo({ top: aboutSection.offsetTop - 50, left: 0, behavior: 'smooth' });
            });
        }
    }

    ngOnInit() {
    }

}
