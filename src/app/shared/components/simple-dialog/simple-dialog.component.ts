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

//ประกาศ Type ของขอมูลที่จะภูกส่งเข้ามา
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
    //รับข้อมูลเข้ามา
    data = inject<DialogData>(MAT_DIALOG_DATA);

    onNoClick(): void {
        //คืนค่า value = false
        this.data.value = false
        //ปิด Dialog
        this.dialogRef.close();
    }

    onConfirmClick(){
        //คืนค่า value = true
        this.data.value = true
        //ปิด Dialog
        this.dialogRef.close();
    }
}