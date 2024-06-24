import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu'
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ClockComponent } from './shared/components/clock/clock.component';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { BackToTopComponent } from './shared/components/back-to-top/back-to-top.component';
import { MapComponent } from './shared/components/map/map.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,//Basic tool Angular
    RouterOutlet, //Router Content
    MatToolbarModule, //Toolbar
    MatButtonModule,//Button
    MatIconModule, //Icon
    MatMenuModule,//Menu Item
    MatCardModule, //Card
    MatSidenavModule,//SideBar
    ClockComponent,//Overlay Component
    BackToTopComponent,//Overlay Component

    MapComponent//Call Map Component
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
}
