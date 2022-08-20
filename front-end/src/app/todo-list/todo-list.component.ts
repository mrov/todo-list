import { Component, OnInit } from '@angular/core';
import { Category, Todo } from './todo-list.interface';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  newTodoItem : Todo = { description: "" }

  addCategoryInput = false;
  categoryInput = "";
  categories : Category[] = [{ description: "Hoje", todoList: [{
      description: "Fazer o TG"
    }]
  }];
  selectedCategoryIndex = 0;

  primaryClass= "mat-focus-indicator mat-flat-button mat-button-base mat-primary ng-star-inserted";

  whiteClass = "mat-focus-indicator mat-flat-button mat-button-base ng-star-inserted";

  constructor() { }

  ngOnInit(): void {
  }

  addTodoItem () : void {
    this.categories[this.selectedCategoryIndex].todoList.push({description: this.newTodoItem.description});
    this.newTodoItem.description = "";
  }

  deleteTodoItem (index: number) : void {
    this.categories[this.selectedCategoryIndex].todoList.splice(index, 1);
  }

  keyDownHandler (event: any): void {
    if (event.key === "Enter") {
      event.preventDefault();
      this.addNewCategory();
    } else if (event.key.toUpperCase() === "ESCAPE") {
      event.preventDefault();
      this.closeCategoryInput();
    }
  }

  addNewCategory (): void {
      this.categories.push({ description: this.categoryInput, todoList: [] });
      this.selectedCategoryIndex = this.categories.length - 1;
      this.categoryInput = "";
      this.addCategoryInput = false;
  }

  closeCategoryInput () {
    this.categoryInput = ""
    this.addCategoryInput = false;
  }

}
