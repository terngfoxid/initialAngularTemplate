import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
    name: 'timeFormatPipe',
    standalone: true
})
export class timeFormatPipe implements PipeTransform {
    transform(value: Date,format:string) {
       
       return "++"
    }
}