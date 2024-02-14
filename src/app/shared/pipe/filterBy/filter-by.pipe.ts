import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterBy',
  standalone: true
})
export class FilterByPipe implements PipeTransform {
  transform(items: string[][] , index: number, value: string | undefined): string[][] {
    if (!items || index === undefined || value === undefined || !value) {
      return items;
    }
    
    return items.filter(item => {
      return item[index].toString().toLowerCase().includes(value.toString().toLowerCase());
    });
  }
}