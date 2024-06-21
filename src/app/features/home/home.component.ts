import { Component, inject, signal } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {
  MatDialog,
} from '@angular/material/dialog';
import { SimpleDialogComponent } from '../../shared/components/simple-dialog/simple-dialog.component';
import { InputDialogComponent } from '../../shared/components/input-dialog/input-dialog.component';
import {MatDividerModule} from '@angular/material/divider';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSliderModule} from '@angular/material/slider';

@Component({
  selector: 'home-component',
  standalone: true,
  imports: [MatToolbarModule,
     MatButtonModule,
      MatIconModule,
       MatCardModule,//การ์ด
       MatDividerModule,//เส้นขั้น
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,//ใช้ Group Input กับ อื่นๆ เช่น label hint
    FormsModule,
    MatDatepickerModule,//เลือกวันที่
    MatSliderModule,//slider
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  readonly dialog = inject(MatDialog);
  readonly value = signal('');

  //structure ตัวแปรที่จะใช้เป็น Input Data ของ Dialog
  optionDialog = {
    header: "Set boolean value", 
    content: "Set boolean value to true or false" , 
    confirm: "Set to true",
    reject: "Set to false", 
    value: false
  }
  //method ที่ใช้แสดง Dialog
  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(SimpleDialogComponent, { //ใช้ method open เพื่อแสดง Dialog
      data: this.optionDialog,//กำหนดค่า data
      width: '500px',//กำหนดความกว้าง
      enterAnimationDuration,//กำหนดเวลาตอนเปิด
      exitAnimationDuration,//กำหนดเวลาตอนปิด
    });
  }

  //structure ตัวแปรที่จะใช้เป็น Input Data ของ Dialog
  optionInputDialog = {
    header: "Input Dialog", 
    content: "Input your value" , 
    confirm: "Confirm",
    reject: "Cancel", 
    value: ""
  }
  //method ที่ใช้แสดง Dialog
  openInputDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(InputDialogComponent, { //ใช้ method open เพื่อแสดง Dialog
      data: this.optionInputDialog,//กำหนดค่า data
      width: '500px',//กำหนดความกว้าง
      enterAnimationDuration,//กำหนดเวลาตอนเปิด
      exitAnimationDuration,//กำหนดเวลาตอนปิด
    });
  }

  //structure ตัวแปรที่จะใช้กับ Select
  optionSelect ={
    selectedValue:0,
    selectItems:[
      {id:0,name:"-"},
      {id:1,name:"Kaiyang"},
      {id:2,name:"Tum pu ma"},
      {id:3,name:"KFC"}
    ]
  }

  //structure ตัวแปรที่จะใช้กับ Select Multi
  optionSelectMulti ={
    selectedValue:[] as number[],
    selectItems:[
      {id:1,name:"Extra cheese"},
      {id:2,name:"Mushroom"},
      {id:3,name:"Onion"},
      {id:4,name:"Sausage"},
      {id:5,name:"Tomato"}
    ]
  }

  //Method ที่ใช้ get String ตัวแรกของ Select Multi
  getFirst(option:{
    selectedValue:number[]
    selectItems:{
      id:number,
      name:string
    }[]
  }){
    const findFirst = option.selectItems.find((item)=>{
      return item.id == option.selectedValue[0]
    })
    return findFirst?.name
  }

  //Method ที่ใช้ get String จากค่า value ของ slider
  formatLabel(value: number): string {
    return `${value}`;
  }
}