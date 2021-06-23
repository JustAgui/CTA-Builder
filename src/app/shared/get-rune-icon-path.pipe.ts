import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getRuneIconPath',
  pure: true
})
export class GetRuneIconPathPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    return this.makeRuneIconPath(value);
  }

  makeRuneIconPath(runeset: string): string {
    return `./assets/runesets/${runeset}.png`;
  }

}
