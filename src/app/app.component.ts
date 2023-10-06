import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FeatLayoutComponent } from '@lzt/core/feat-layout';

@Component({
  standalone: true,
  imports: [RouterModule, FeatLayoutComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'lucy-zion-thatcher';
}
