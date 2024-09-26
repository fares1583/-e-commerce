import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private http = inject(HttpClient);
  private apiUrl = 'https://dummyjson.com/products';

  constructor() {}

  products() {
    return this.http.get<any>(`${this.apiUrl}?limit=0&skip=0`);
  }

  productsDetails(id: number) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  getProducts(page?: number, size?: number) {
    const limit = page;
    return this.http.get<any>(
      `${this.apiUrl}?limit=${limit}&skip=${size}`
    );
  }

  addProduct(product: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, product, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  updateProduct(id: number, product: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, product, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}