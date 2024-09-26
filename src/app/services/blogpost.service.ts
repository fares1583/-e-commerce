import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BlogpostServices {
  private postUrl = 'https://dummyjson.com/posts';
  private commentUrl = 'https://dummyjson.com/comments/post/';

  constructor(private http: HttpClient) {}

  getData(): Observable<any> {
    return this.http.get<any>(this.postUrl);
  }

  getPost(id: string): Observable<any> {
    return this.http.get<any>(`${this.postUrl}/${id}`);
  }

  getComments(id: string): Observable<any> {
    return this.http.get<any>(`${this.commentUrl}${id}`);
  }
}
