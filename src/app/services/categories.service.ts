import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private http = inject(HttpClient);

  constructor() {}

  categories() {
    return this.http.get<any>('https://dummyjson.com/products/category-list');
  }
  categoryDetails(name: string) {
    return this.http.get<any>(
      'https://dummyjson.com/products/category/' + name
    );
  }
}
