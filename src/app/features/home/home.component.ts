import { Component, Injectable, computed, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import {
  MatDialog,
} from '@angular/material/dialog';
import { SimpleDialogComponent } from '../../shared/components/simple-dialog/simple-dialog.component';
import { InputDialogComponent } from '../../shared/components/input-dialog/input-dialog.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSliderModule } from '@angular/material/slider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { SnackBarComponent } from '../../shared/components/snack-bar/snack-bar.component';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';

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
    MatProgressBarModule,//progress bar
    MatRadioModule,//Radio Button group
    MatCheckboxModule,//Check box group
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
    content: "Set boolean value to true or false",
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
    content: "Input your value",
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
  optionSelect = {
    selectedValue: 0,
    selectItems: [
      { id: 0, name: "-" },
      { id: 1, name: "Kaiyang" },
      { id: 2, name: "Tum pu ma" },
      { id: 3, name: "KFC" }
    ]
  }

  //structure ตัวแปรที่จะใช้กับ Select Multi
  optionSelectMulti = {
    selectedValue: [] as number[],
    selectItems: [
      { id: 1, name: "Extra cheese" },
      { id: 2, name: "Mushroom" },
      { id: 3, name: "Onion" },
      { id: 4, name: "Sausage" },
      { id: 5, name: "Tomato" }
    ]
  }

  //Method ที่ใช้ get String ตัวแรกของ Select Multi
  getFirst(option: {
    selectedValue: number[]
    selectItems: {
      id: number,
      name: string
    }[]
  }) {
    const findFirst = option.selectItems.find((item) => {
      return item.id == option.selectedValue[0]
    })
    return findFirst?.name
  }

  //Method ที่ใช้ get String จากค่า value ของ slider
  formatLabel(value: number): string {
    return `${value}`;
  }

  //init snack bar
  //ประกาศ constructor ที่ใช้เรียก Snack Bar
  constructor(private _snackBar: MatSnackBar){}
  openSnackBar() {
    //เรียกโดยใช้method openFromComponent โดยไปเรียก SnackBarComponent
    this._snackBar.openFromComponent(SnackBarComponent, {
      duration: 3 * 1000, //กำหนดเวลา หน่วยเป็น ms
    });
  }
  //snack bar posittion
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  openPositionSnackBar() {
    this._snackBar.open('Cannonball!!', 'Splash', {
      horizontalPosition: this.horizontalPosition,//แนวนอน
      verticalPosition: this.verticalPosition,//แนวตั้ง
    });
  }

  //check box init
  //กำหนดข้อมูลที่จะใช้ใน checkbox
  task = {
    name: 'Parent task',
    completed: false,
    subtasks: [//check box ย่อย
      {name: 'Child task 1', completed: false},
      {name: 'Child task 2', completed: false},
      {name: 'Child task 3', completed: false},
    ],
  };

  //method เมื่อมีการ check แค่บาง child จะคืน true
  readonly partiallyComplete = () => {
    const task = this.task;
    if (!task.subtasks) {
      return false;
    }
    return task.subtasks.some(t => t.completed) && !task.subtasks.every(t => t.completed);
  };

  //method อัพเดตค่าในตัวแปร
  update(completed: boolean, index?: number) {
      if (index === undefined) {
        //กำหนดค่า parent ตามที่ได้จาก check box
        this.task.completed = completed;
        //กำหนดค่าตัวลูกทั้งหมดตาม
        this.task.subtasks?.forEach((t: { completed: boolean; }) => (t.completed = completed));
      } else {
        //กำหนดค่า child ตามที่ได้จาก check box
        this.task.subtasks![index].completed = completed;
        //กำหนดค่าตัว parent ตามการเปลี่ยนแปลงของ child
        this.task.completed = this.task.subtasks?.every((t: { completed: any; }) => t.completed) ?? true;
      }
  }
}
