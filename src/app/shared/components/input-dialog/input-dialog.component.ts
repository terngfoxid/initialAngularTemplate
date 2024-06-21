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

//ประกาศ Type ของขอมูลที่จะภูกส่งเข้ามา
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
    //รับข้อมูลเข้ามา
    data = inject<DialogData>(MAT_DIALOG_DATA);
    //ตัวแปรไว้เก็บค่าข้อมูล ให้เท่ากับ value ที่เข้ามา
    newValue= this.data.value;

    onNoClick(): void {
        //ปิด Dialog
        this.dialogRef.close();
    }

    onConfirmClick(){
        //หาก Confirm ให้ value เท่ากับค่าใหม่
        this.data.value = this.newValue
        //ปิด Dialog
        this.dialogRef.close();
    }
}