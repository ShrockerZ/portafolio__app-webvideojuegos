import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cleantext'
})
export class CleantextPipe implements PipeTransform {
  transform(text: string): string {
    console.log("")
    return text.toLowerCase().replace(/<p>/g,'').replace(/[<p>]/g,'');
  }

}
