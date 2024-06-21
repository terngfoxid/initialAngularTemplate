import { Component, ElementRef, Inject, PLATFORM_ID, ViewChild, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { isPlatformBrowser } from '@angular/common';

@Component({
    selector: 'clock-component',
    standalone: true,
    imports: [MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatCardModule,
    ],
    templateUrl: './clock.component.html',
    styleUrl: './clock.component.css',
})
export class ClockComponent {
    isBrowser = signal(false);
    //ประกาศ Child element ของ Component เชื่อ Template ว่า clock
    @ViewChild('clock', { static: false }) public clock: ElementRef | undefined;

    constructor(@Inject(PLATFORM_ID) platformId: object) {
        this.isBrowser.set(isPlatformBrowser(platformId));  // บันทึก platformId ใน signal ไว้ใช้งานอื่นๆ
    }

    ngAfterViewInit(): void {
        if (this.isBrowser()) { // ตรวจสอบว่าทำงานที่ Browser Client เพื่อไม่ให้ SSR ทำงานผิดพลาด หากไม่ทำจะเปิดการนับเวลาแบบ Infinite loop ที่ Server
            setInterval(() => { // สั่งนับเวลานาฬิกาทุก 1วินาที
                this.showTime()
            }, 1000);
        }
    }

    private showTime() {
        const d = new Date();
        let hour = d.getHours();
        const min = d.getMinutes();
        const sec = d.getSeconds();

        /*let MV = "AM";
        if (hour == 12) {
            MV = "PM";
        }
        if (hour > 12) {
            hour = hour % 12;
            MV = "PM";
        }*/
        if (this.clock != null) {
            //แก้ไข innerHTML ของ clock ให้เป็น String ค่าใหม่
            this.clock.nativeElement.innerHTML = + ("0" + hour).slice(-2) + ":" + ("0" + min).slice(-2) + ":" + ("0" + sec).slice(-2);
        }
    }
}