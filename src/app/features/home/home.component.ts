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
       MatCardModule,
       MatDividerModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule,
    MatDatepickerModule,
    MatSliderModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  readonly dialog = inject(MatDialog);
  readonly value = signal('');

  optionDialog = {
    header: "Set boolean value", 
    content: "Set boolean value to true or false" , 
    confirm: "Set to true",
    reject: "Set to false", 
    value: false
  }
  
  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(SimpleDialogComponent, {
      data: this.optionDialog,
      width: '500px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  optionInputDialog = {
    header: "Input Dialog", 
    content: "Input your value" , 
    confirm: "Confirm",
    reject: "Cancel", 
    value: ""
  }

  openInputDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(InputDialogComponent, {
      data: this.optionInputDialog,
      width: '500px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  optionSelect ={
    selectedValue:0,
    selectItems:[
      {id:0,name:"-"},
      {id:1,name:"Kaiyang"},
      {id:2,name:"Tum pu ma"},
      {id:3,name:"KFC"}
    ]
  }

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

  formatLabel(value: number): string {
    return `${value}`;
  }
}