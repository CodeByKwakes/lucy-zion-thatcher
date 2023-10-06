import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FeatLayoutComponent } from '@lzt/core/feat-layout';
import { DataService } from '@lzt/core/data-access';

@Component({
  standalone: true,
  imports: [RouterModule, FeatLayoutComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'lucy-zion-thatcher';
  pages = inject(DataService);

  constructor() {
    this.pages.loadAllPages().subscribe((data) => {
      console.log('data', data);
    });
  }
}
