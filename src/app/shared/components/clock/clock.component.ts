import { Component, ElementRef, Inject, PLATFORM_ID, ViewChild, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { timeFormatPipe } from '../../pipes/time-format.pipe';
import { isPlatformBrowser } from '@angular/common';

@Component({
    selector: 'clock-component',
    standalone: true,
    imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatCardModule, MatSidenavModule, timeFormatPipe],
    templateUrl: './clock.component.html',
    styleUrl: './clock.component.css',
})
export class ClockComponent {
    isBrowser = signal(false);
    @ViewChild('clock', { static: false }) public clock: ElementRef | undefined;

    constructor(@Inject(PLATFORM_ID) platformId: object) {
        this.isBrowser.set(isPlatformBrowser(platformId));  // save isPlatformBrowser in signal
    }

    ngAfterViewInit(): void {
        if (this.isBrowser()) { // check it where you want to write setTimeout or setInterval
            setInterval(() => {
                this.showTime()
            }, 1000);
        }
    }

    private showTime() {
        const d = new Date();
        let hour = d.getHours();
        const min = d.getMinutes();
        const sec = d.getSeconds();

        let MV = "AM";
        if (hour == 12) {
            MV = "PM";
        }
        if (hour > 12) {
            hour = hour % 12;
            MV = "PM";
        }
        if(this.clock != null){
            this.clock.nativeElement.innerHTML = + ("0" + hour).slice(-2) + ":" + ("0" + min).slice(-2) + ":" + ("0" + sec).slice(-2) + " " + MV;
        }
    }
}