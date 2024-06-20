import { Component, inject, signal } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatSidenavModule} from '@angular/material/sidenav';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { SimpleDialogComponent } from '../../shared/components/simple-dialog/simple-dialog.component';
import { InputDialogComponent } from '../../shared/components/input-dialog/input-dialog.component';

@Component({
  selector: 'home-component',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatCardModule,MatSidenavModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
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
}