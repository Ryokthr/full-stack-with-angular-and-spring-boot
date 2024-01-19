import { Component } from '@angular/core';
import { TodoDataService } from '../service/data/todo-data.service';
import { Todo } from '../list-todos/list-todos.component';
import { ActivatedRoute } from '@angular/router';

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
    private todoService: TodoDataService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.todo = new Todo(1, '', false, new Date())
    this.todoService.retrieveTodo('in28minutes', this.id)
        .subscribe(
          data => this.todo = data
        );
  }

  saveTodo(): void {

  }
}
