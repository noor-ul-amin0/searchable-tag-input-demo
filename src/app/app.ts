import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserFormComponent } from './components/user-form';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, UserFormComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('ang-tag-input-demo');
}
