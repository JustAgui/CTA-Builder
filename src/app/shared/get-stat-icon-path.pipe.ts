import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getStatIconPath'
})
export class GetStatIconPathPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    return this.makeStatIconPath(value);
  }

  makeStatIconPath(stats: string): string {
    return `./assets/stats/${stats}.png`;
  }

}
