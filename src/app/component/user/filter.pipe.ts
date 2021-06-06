import { Pipe, PipeTransform } from "@angular/core";
import {User} from '../../model/user.model';

@Pipe({
  name: "filter"
})
export class FilterPipe implements PipeTransform {
  transform(value: any[], searchValue: string, selectedOption: string) {
    if (!searchValue) return value;
    return value.filter(
      v => v[selectedOption].toLowerCase().indexOf(searchValue.toLowerCase()) > -1
    )
  }
}
