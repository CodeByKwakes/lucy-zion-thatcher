import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from '@lzt/core/feature';

@Component({
  imports: [RouterModule, LayoutComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {}
