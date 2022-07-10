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

  it('should delete a item in the todoList', () => {
    const addTodoItemSpy = spyOn(component, "addTodoItem").and.callThrough();
    const deleteTodoItemSpy = spyOn(component, "deleteTodoItem").and.callThrough();


    const addItemButton = fixture.debugElement.query( By.css('#addTodoItem') ).nativeElement;
    const todoInput: HTMLInputElement = fixture.debugElement.query( By.css('#todoInput') ).nativeElement;

    
    todoInput.value = 'testetodo';
    todoInput.dispatchEvent(new Event('input'));
    
    fixture.detectChanges();

    addItemButton.dispatchEvent(new Event('click'));

    fixture.detectChanges();
    
    expect(addTodoItemSpy).toHaveBeenCalled();
    expect(component.newTodoItem.description).toBeFalsy();
    expect(component.todoList.length).toBeGreaterThan(1);

    const deleteItemButton = fixture.debugElement.query( By.css('#delete-item-1') ).nativeElement;

    deleteItemButton.dispatchEvent(new Event('click'));

    fixture.detectChanges();

    expect(deleteTodoItemSpy).toHaveBeenCalledOnceWith(1);
    expect(component.todoList.length).toEqual(1);
  });
});
