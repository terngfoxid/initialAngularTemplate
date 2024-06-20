import { ChangeDetectionStrategy, Component, inject, model } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import {
    MAT_DIALOG_DATA,
    MatDialog,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogRef,
    MatDialogTitle,
} from '@angular/material/dialog';

interface DialogData {
    header: string;
    content: string;
    confirm: string;
    reject: string;
    value: boolean;
}

@Component({
    selector: 'simple-dialog-component',
    templateUrl: './simple-dialog.component.html',
    standalone: true,
    imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimpleDialogComponent {
    readonly dialogRef = inject(MatDialogRef<SimpleDialogComponent>);
    data = inject<DialogData>(MAT_DIALOG_DATA);

    onNoClick(): void {
        this.data.value = false
        this.dialogRef.close();
    }

    onConfirmClick(){
        this.data.value = true
        this.dialogRef.close();
    }
}