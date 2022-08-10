import { Pipe, PipeTransform } from '@angular/core';
import { SearchedSitter } from '../interfaces/searchedSitter';

@Pipe({
  name: 'searchSitterByName'
})
export class SearchSitterByNamePipe implements PipeTransform {

  transform(sitters: SearchedSitter[], searchByName: string): SearchedSitter[] {
    return searchByName === '' ? sitters : sitters.filter(sitter => sitter.userName.toLowerCase().includes(searchByName.toLowerCase()));
  }

}
