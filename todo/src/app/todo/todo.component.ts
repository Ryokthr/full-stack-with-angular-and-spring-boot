import { Component } from '@angular/core';
import { TodoDataService } from '../service/data/todo-data.service';
import { Todo } from '../list-todos/list-todos.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {

  id: number = 0
  todo: Todo = new Todo(this.id, '', false, new Date());

  constructor(
    private route: ActivatedRoute,
    private todoService: TodoDataService,
    private router: Router
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.todo = new Todo(this.id, '', false, new Date())
    if (this.id != -1) {
      this.todoService.retrieveTodo('in28minutes', this.id)
        .subscribe(
          data => this.todo = data
        );
    }
  }

  saveTodo(): void {
    if (this.id == -1) {
      this.todoService.createTodo('in28minutes', this.todo).subscribe(data => {
        console.log(data);
        this.router.navigate(['todos']);
      })
    } else {
      this.todoService.updateTodo('in28minutes', this.id, this.todo).subscribe(data => {
        console.log(data);
        this.router.navigate(['todos']);
      })
    }
  }
}
