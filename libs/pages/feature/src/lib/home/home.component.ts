import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HomePage } from '@lzt/shared/models';
import { BasePageComponent } from '../BasePageComponent';
import { useCoreStore } from '@lzt/core/data-access';
import { GetAssetPipe } from '@lzt/shared/utils';

@Component({
  standalone: true,
  imports: [CommonModule, GetAssetPipe],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends BasePageComponent<HomePage> {
  readonly coreStore = useCoreStore();

  onRouteToPage(page: string): void {
    this.coreStore.routeTo([page]);
  }
}
