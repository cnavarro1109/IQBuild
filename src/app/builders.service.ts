import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Todo {
  id: number;
  vin: number | string;
  year: number;
  brand: string;
  color: string;
}



@Injectable()
export class BuildersService {
  todos: Observable<Todo[]>;
  private _todos: BehaviorSubject<Todo[]>;
  private baseUrl: string;
  private dataStore: {
    todos: Todo[]
  };

  constructor(private http: Http) {
    this.baseUrl = 'assets/data/builders.json';
    this.dataStore = { todos: [] };
    this._todos = <BehaviorSubject<Todo[]>>new BehaviorSubject([]);
    this.todos = this._todos.asObservable();
  }

  loadAll() {
    this.http.get(`${this.baseUrl}`).subscribe(data => {
      this.dataStore.todos = data.json();
      console.log('DATA: ', data);
      this._todos.next(Object.assign({}, this.dataStore).todos);
    }, error => console.log('Could not load todos.'));
  }

  load(id: number | string) {
    this.http.get(`${this.baseUrl}/${id}`).subscribe(data => {
      let notFound = true;

      this.dataStore.todos.forEach((item, index) => {
        if (item.id === data['id']) {
          this.dataStore.todos[index] = data.json();
          notFound = false;
        }
      });

      if (notFound) {
        this.dataStore.todos.push(data.json());
      }

      this._todos.next(Object.assign({}, this.dataStore).todos);
    }, error => console.log('Could not load todo.'));
  }

  create(todo: Todo) {
    this.http.post(`${this.baseUrl}`, JSON.stringify(todo)).subscribe(data => {
        // this.dataStore.todos.push(data);
        this._todos.next(Object.assign({}, this.dataStore).todos);
      }, error => console.log('Could not create todo.'));
  }

  update(todo: Todo) {
    this.http.put(`${this.baseUrl}/${todo.id}`, JSON.stringify(todo))
      .subscribe(data => {
        this.dataStore.todos.forEach((t, i) => {
          if (t.id === data['id']) { this.dataStore.todos[i] = data.json(); }
        });

        this._todos.next(Object.assign({}, this.dataStore).todos);
      }, error => console.log('Could not update todo.'));
  }

  remove(todoId: number) {
    this.http.delete(`${this.baseUrl}/${todoId}`).subscribe(response => {
      this.dataStore.todos.forEach((t, i) => {
        if (t.id === todoId) { this.dataStore.todos.splice(i, 1); }
      });

      this._todos.next(Object.assign({}, this.dataStore).todos);
    }, error => console.log('Could not delete todo.'));
  }
}
