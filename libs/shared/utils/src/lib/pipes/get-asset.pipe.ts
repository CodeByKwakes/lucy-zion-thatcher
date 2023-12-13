import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../environments/environment';

@Pipe({
  name: 'getAsset',
  standalone: true
})
export class GetAssetPipe implements PipeTransform {
  transform(id: string): string | null {
    if (!id) return null;
    return `${environment.directus.imagePath}/${id}`;
  }
}
