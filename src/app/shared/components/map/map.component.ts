import { Component, Inject, PLATFORM_ID, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { isPlatformBrowser } from '@angular/common';

@Component({
    selector: 'map-component',
    standalone: true,
    imports: [MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatCardModule,
    ],
    templateUrl: './map.component.html',
    styleUrl: './map.component.css',
})
export class MapComponent {
    /*Custom By SSTfoxide*/
    /*Powered By Leaflet*/ 
    /*Map license OpenStreetMap*/
    isBrowser = signal(false);

    constructor(@Inject(PLATFORM_ID) platformId: object) {
        this.isBrowser.set(isPlatformBrowser(platformId));  // บันทึก platformId ใน signal ไว้ใช้งานอื่นๆ
    }

    ngAfterViewInit(): void {
        // ตรวจสอบว่าทำงานที่ Browser Client เพื่อไม่ให้ SSR ทำงานผิดพลาด เมื่อสั่งคำสั่งที่ทำงานบน Client เท่านั้น
        if (this.isBrowser()) { 

        }
    }

}