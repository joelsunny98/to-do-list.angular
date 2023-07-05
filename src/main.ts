import { ToDoComponent } from './app/components/to-do/to-do.component';
import { bootstrapApplication } from '@angular/platform-browser';


bootstrapApplication(ToDoComponent)
.catch((err)=>console.error(err));
