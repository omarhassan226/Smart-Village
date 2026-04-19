import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'products',
  pure: true
})
export class ProductsPipe implements PipeTransform {

  transform(allvalues) {
    let result = [];
    allvalues[0].forEach(el1 => {
      allvalues[1].forEach(el2 => {
        allvalues[2].forEach(el3 => {
          result.push(`${el1.name_ar} / ${el2.name_ar} / ${el3.name_ar}`);
        });
      });
    });
    return result;
  }

}
