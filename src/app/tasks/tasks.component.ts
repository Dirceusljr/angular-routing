import {
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { TaskComponent } from './task/task.component';
import { TasksService } from './tasks.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent, RouterLink],
})
export class TasksComponent implements OnInit {
  userId = input.required<string>();
  order = input<'asc' | 'desc'>('desc');
  // order?: 'asc' | 'desc';
  private tasksService = inject(TasksService);
  // private activatedRoute = inject(ActivatedRoute);
  // private destroyRef = inject(DestroyRef);

  userTasks = computed(() =>
    this.tasksService
      .allTasks()
      .filter((task) => task.userId === this.userId())
      .sort((a, b) => {
        if (this.order() === 'desc') {
          return a.id > b.id? -1 : 1;
        }else {
          return a.id > b.id? 1 : -1;
        }
      })
  );

  ngOnInit(): void {
    // const subscription = this.activatedRoute.queryParams.subscribe({
    //   next: (params) => (this.order = params['order']),
    // });
    // this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}
