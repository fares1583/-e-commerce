import { Component, inject } from '@angular/core';
import { CategoriesService } from '../services/categories.service';
import { NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { CardModule } from 'primeng/card';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [NgFor, NgIf, CardModule, TitleCasePipe, RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent {
  private categoryService = inject(CategoriesService);
  public categories: any;

  constructor() {
    this.categoryService.categories().subscribe({
      next: (response) => {
        this.categories = response;
      },
    });
  }
}
