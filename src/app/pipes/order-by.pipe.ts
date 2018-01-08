import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let newVal = value.sort((a: any, b: any) => {
      let date1 = new Date(a.editDate);
      let date2 = new Date(b.editDate);

      if(args){
        if (date1 > date2) {
          return 1;
        } else if (date1 < date2) {
          return -1;
        } else {
          return 0;
        }
      } else{
        if (date1 < date2) {
          return 1;
        } else if (date1 > date2) {
          return -1;
        } else {
          return 0;
        }
      }
    });
    return newVal;
  }

}
