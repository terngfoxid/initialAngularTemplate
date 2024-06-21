import { Routes } from '@angular/router';

export const routes: Routes = [
    //แบ่ง route ออกย่อยเป็นหลายๆส่วนตาม Features
    { path : '' , loadChildren : () => import('./features/home/home.routes') }
];
