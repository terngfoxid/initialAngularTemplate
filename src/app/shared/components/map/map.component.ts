import { Component, Inject, PLATFORM_ID, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'map-component',
    standalone: true,
    imports: [MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        CommonModule,
        MatRadioModule,
        FormsModule,
    ],
    templateUrl: './map.component.html',
    styleUrl: './map.component.css',
})
export class MapComponent {
    /*Custom By SSTfoxide*/
    /*Powered By Leaflet*/
    /*Map license OpenStreetMap*/
    /*This is important pls don't forget import leaflet CSS in styles.css*/

    isBrowser = signal(false);
    isReady = signal(false);

    map: any;
    Icon: any[] = []

    selectedIndex = "1";

    constructor(@Inject(PLATFORM_ID) platformId: object) {
        this.isBrowser.set(isPlatformBrowser(platformId));  // บันทึก platformId ใน signal ไว้ใช้งานอื่นๆ
    }

    ngAfterViewInit(): void {
        // ตรวจสอบว่าทำงานที่ Browser Client เพื่อไม่ให้ SSR ทำงานผิดพลาด เมื่อสั่งคำสั่งที่ทำงานบน Client เท่านั้น
        if (this.isBrowser()) {
            import('leaflet').then((Leaflet) => {
                this.configMap(Leaflet);
            });
        }
    }

    //prepare Map
    configMap(Leaflet: any) {
        this.map = Leaflet.map('map', {
            center: [13.736717, 100.523186],
            zoom: 13,
        })

        Leaflet.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.map);

        const warnIcon = Leaflet.icon({
            iconUrl: 'assets/icons/warning.png',
            iconSize: [30, 30], // size of the icon
            iconAnchor: [15, 15], // point of the icon which will correspond to marker's location
            popupAnchor: [0.5, -8] // point from which the popup should open relative to the iconAnchor
        })
        const okIcon = Leaflet.icon({
            iconUrl: 'assets/icons/ok.png',
            iconSize: [21, 21], // size of the icon
            iconAnchor: [11, 11], // point of the icon which will correspond to marker's location
            popupAnchor: [0.5, -8] // point from which the popup should open relative to the iconAnchor
        })
        const cargoIcon = Leaflet.icon({
            iconUrl: 'assets/icons/cargo.png',
            iconSize: [21, 21], // size of the icon
            iconAnchor: [11, 11], // point of the icon which will correspond to marker's location
            popupAnchor: [0.5, -8] // point from which the popup should open relative to the iconAnchor
        })

        this.Icon.push(warnIcon)
        this.Icon.push(okIcon)
        this.Icon.push(cargoIcon)

        this.map.on('dblclick', (e: { latlng: any; }) => {
            var clickLocation = e.latlng;

            const newMaker = Leaflet.marker(clickLocation, { icon: this.Icon[parseInt(this.selectedIndex) - 1] }).addTo(this.map);
            const popup = Leaflet.popup().setContent("Warning at " + newMaker.getLatLng());
            switch (this.selectedIndex) {
                case '1': {
                    popup.setContent("Warning at " + newMaker.getLatLng());
                    break;
                }
                case '2': {
                    popup.setContent("Ok at " + newMaker.getLatLng());
                    break;
                }
                case '3': {
                    popup.setContent("Cargo at " + newMaker.getLatLng());
                    break;
                }
            }

            newMaker.bindPopup(popup).openPopup();

            newMaker.on('dblclick', (e: { latlng: any; }) => {
                newMaker.remove();
            })
        });
    }

    showSelectedValue() {
        console.log(this.selectedIndex)
    }
}