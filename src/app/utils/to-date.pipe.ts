import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toDate',
  standalone: true
})
export class ToDatePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    
    if(value){
      let formattedDate =new Date(value.toString());
      return formattedDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
       // hour: '2-digit',
        //minute: '2-digit'
    });
    }
    return null;
  }

}
