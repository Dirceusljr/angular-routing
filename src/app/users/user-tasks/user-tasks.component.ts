import {
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';

import { UsersService } from '../users.service';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
})
export class UserTasksComponent implements OnInit {
  userId = input.required<string>();
  usersService = inject(UsersService);
  private activetedRoute = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);
  userName = '';

  // userName = computed(
  //   () => this.usersService.users.find((u) => u.id === this.userId())?.name
  // );

  ngOnInit(): void {
    console.log(this.activetedRoute);
    const subscription = this.activetedRoute.paramMap.subscribe({
      next: (paraMap) => {
        this.userName =
          this.usersService.users.find((u) => u.id === paraMap.get('userId'))
            ?.name || '';
      },
    });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}
