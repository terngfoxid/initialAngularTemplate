import { Component, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import {
    MatSnackBarAction,
    MatSnackBarActions,
    MatSnackBarLabel,
    MatSnackBarRef,
  } from '@angular/material/snack-bar';

@Component({
    selector: 'snack-bar-component',
    templateUrl: './snack-bar.component.html',
    standalone: true,
    imports: [MatButtonModule, MatSnackBarLabel, MatSnackBarActions, MatSnackBarAction]
})
export class SnackBarComponent {
    snackBarRef = inject(MatSnackBarRef);
}