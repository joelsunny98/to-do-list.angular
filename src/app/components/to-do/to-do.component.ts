import { CommonModule } from '@angular/common';
import { Component, isStandalone } from '@angular/core';

@Component({
  selector: 'app-to-do',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.scss']

})
export class ToDoComponent {

}
