import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule, By } from '@angular/platform-browser';

import { TodoListComponent } from './todo-list.component';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';

import { AppRoutingModule } from '../app-routing.module';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoListComponent ],
      imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        MatInputModule
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add a new item in the todoList', () => {
    const addTodoItemSpy = spyOn(component, "addTodoItem").and.callThrough();

    const addItemButton = fixture.debugElement.query( By.css('#addTodoItem') ).nativeElement;

    const todoInput: HTMLInputElement = fixture.debugElement.query( By.css('#todoInput') ).nativeElement;

    todoInput.value = 'Estudar para fisica';
    todoInput.dispatchEvent(new Event('input'));
    
    fixture.detectChanges();

    addItemButton.dispatchEvent(new Event('click'));

    fixture.detectChanges();
    
    expect(addTodoItemSpy).toHaveBeenCalled();
    expect(component.newTodoItem.description).toBeFalsy();
    expect(component.todoList.length).toBeGreaterThan(1);
  });

  it('should add and delete a item in the todoList', () => {
    // Create the spies for the component functions
    const addTodoItemSpy = spyOn(component, "addTodoItem").and.callThrough();
    const deleteTodoItemSpy = spyOn(component, "deleteTodoItem").and.callThrough();

    // Search the input and addItem button in the HTML
    const addItemButton: HTMLButtonElement = fixture.debugElement.query( By.css('#addTodoItem') ).nativeElement;
    const todoInput: HTMLInputElement = fixture.debugElement.query( By.css('#todoInput') ).nativeElement;

    // Simulate user input in the form
    todoInput.value = 'testetodo';
    todoInput.dispatchEvent(new Event('input'));
    
    fixture.detectChanges();
    
    // Simulate user click in the add button
    addItemButton.dispatchEvent(new Event('click'));

    fixture.detectChanges();

    // Search the item was added in the todoList
    let findRecentlyAddedItem = component.todoList.find(item => { return item.description === "testetodo"});
    
    // Expects
    expect(addTodoItemSpy).toHaveBeenCalled();
    expect(findRecentlyAddedItem).toBeTruthy();
    expect(component.newTodoItem.description).toBeFalsy();
    expect(component.todoList.length).toBeGreaterThan(1);

    // Search the delete button in the HTML by css ID
    const deleteItemButton = fixture.debugElement.query( By.css('#delete-item-1') ).nativeElement;

    // Simulate the user click in the delete button
    deleteItemButton.dispatchEvent(new Event('click'));

    fixture.detectChanges();

    // Search the item was added in the todoList
    findRecentlyAddedItem = component.todoList.find(item => { return item.description === "testetodo"});

    // Expects
    expect(findRecentlyAddedItem).toBeFalsy();
    expect(deleteTodoItemSpy).toHaveBeenCalledOnceWith(1);
    expect(component.todoList.length).toEqual(1);
  });
});
