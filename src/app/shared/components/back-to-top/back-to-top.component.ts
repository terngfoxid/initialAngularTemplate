import { Component, Inject, PLATFORM_ID, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
    selector: 'back-to-top-component',
    standalone: true,
    imports: [MatButtonModule, MatIconModule,CommonModule],
    templateUrl: './back-to-top.component.html',
    styleUrl: './back-to-top.component.css',
})
export class BackToTopComponent {
    isBrowser = signal(false);
    ButtonShow = false;

    constructor(@Inject(PLATFORM_ID) platformId: object) {
        this.isBrowser.set(isPlatformBrowser(platformId));  // save isPlatformBrowser in signal
    }

    ngAfterViewInit(): void {
        if (this.isBrowser()) { // check it where you want to write setTimeout or setInterval
            window.addEventListener('scroll', () => {
                if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
                    this.ButtonShow = true;
                } else {
                    this.ButtonShow = false;
                }
            });
        }
    }

    scrollToTop() {
        window.scrollTo({top: 0, behavior: 'smooth'})
    }

}