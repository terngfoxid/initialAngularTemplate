import { ChangeDetectionStrategy, Component, inject, model } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {
    MAT_DIALOG_DATA,
    MatDialog,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogRef,
    MatDialogTitle,
} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';

interface DialogData {
    header: string;
    content: string;
    confirm: string;
    reject: string;
    value: string;
}

@Component({
    selector: 'input-dialog-component',
    templateUrl: './input-dialog.component.html',
    standalone: true,
    imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent,MatInputModule,FormsModule,MatFormFieldModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputDialogComponent {
    readonly dialogRef = inject(MatDialogRef<InputDialogComponent>);
    data = inject<DialogData>(MAT_DIALOG_DATA);
    newValue= this.data.value;

    onNoClick(): void {
        this.dialogRef.close();
    }

    onConfirmClick(){
        this.data.value = this.newValue
        this.dialogRef.close();
    }
}