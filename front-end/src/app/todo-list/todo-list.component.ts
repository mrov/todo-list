import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  todoList = [
    { description: "Fazer o TG" }
  ]

  newTodoItem = { description: "" }

  constructor() { }

  addTodoItem () : void {
    this.todoList.push({description: this.newTodoItem.description});
    this.newTodoItem.description = "";
  }

  deleteTodoItem (index: number) : void {
    this.todoList.splice(index, 1);
  }

  ngOnInit(): void {
  }

}
