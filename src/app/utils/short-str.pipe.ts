import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortStr',
  standalone: true
})
export class ShortStrPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    if(value && typeof value === 'string'){
      let maxLength = args[0] && !isNaN(Number(args[0])) ? Number(args[0]) :20;
      console.log("value:",maxLength);
      
      if(value.length > maxLength){
          return value.substring(0,maxLength)+'...';
      }
      return value;
    }
    return null;
  }

}
