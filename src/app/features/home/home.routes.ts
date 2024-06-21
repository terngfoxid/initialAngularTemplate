import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';

const routes: Routes = [
  //ประกาศ Route ต่างๆ ของ Feature Home
  { path : '', component : HomeComponent },
  { path : 'home', component : HomeComponent }
];

export default routes