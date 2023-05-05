import { Pipe, PipeTransform } from '@angular/core';

/**
 * @Pipe
 * @param name - The name of the pipe.
 * @returns A new instance of the pipe.
 * @remarks
 * This is a custom pipe that filters an array of users based on the keys and term provided.
 */
@Pipe({
  name: 'userQuery'
})
export class UserQueryPipe implements PipeTransform {

  public transform(value, keys: string, term: string) {

    if (!term) { return value; }
    return (value || []).filter(item => keys.split(',').some(key => item.hasOwnProperty(key) && new RegExp(term, 'gi').test(item[key])));

  }
}