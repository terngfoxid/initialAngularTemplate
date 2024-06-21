import { Component, Inject, PLATFORM_ID, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
    selector: 'back-to-top-component',
    standalone: true,
    imports: [MatButtonModule,
        MatIconModule,
        CommonModule,//เพื่อให้สามารถใช้ *ngIf ได้
    ],
    templateUrl: './back-to-top.component.html',
    styleUrl: './back-to-top.component.css',
})
export class BackToTopComponent {
    isBrowser = signal(false);
    ButtonShow = false;

    constructor(@Inject(PLATFORM_ID) platformId: object) {
        this.isBrowser.set(isPlatformBrowser(platformId));  // บันทึก platformId ใน signal ไว้ใช้งานอื่นๆ
    }

    ngAfterViewInit(): void {
        if (this.isBrowser()) { // ตรวจสอบว่าทำงานที่ Browser Client เพื่อไม่ให้ SSR ทำงานผิดพลาด
            window.addEventListener('scroll', () => { //หากทำงานที่ Browser Client จะทำ event ทุกครั้งที่มีการ scroll
                if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
                    this.ButtonShow = true;//ถ้าระยะหว่างจาก top มากกว่า 50 จะแสดงปุ่ม Back to top
                } else {
                    this.ButtonShow = false;//ถ้าระยะหว่างจาก top น้อยกว่า 50 จะซ่อนปุ่ม Back to top
                }
            });
        }
    }

    scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' })//สั่ง Scroll ไปยัง top แบบ smooth
    }

}