import { Component, inject } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';
import { TableModule } from 'primeng/table';
import { NgFor, NgTemplateOutlet } from '@angular/common';
import { ProductsService } from '../services/products.service';
import { CategoriesService } from '../services/categories.service';
import { BlogpostServices } from '../services/blogpost.service';
import { ButtonModule } from 'primeng/button';
import { map } from 'rxjs';

const productsColumns: any[] = [
  { field: 'id', header: 'Id' },
  { field: 'title', header: 'Title' },
  { field: 'category', header: 'Category' },
  { field: 'description', header: 'Description' },
];
const blogsColumns: any[] = [
  { field: 'id', header: 'Id' },
  { field: 'title', header: 'Title' },
  { field: 'body', header: 'Body' },
  { field: 'tags', header: 'Tags' },
];
const categoriesColumns: any[] = [
  { field: 'id', header: 'Id' },
  { field: 'name', header: 'Category' },
];

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [TabViewModule, TableModule, NgTemplateOutlet, NgFor, ButtonModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent {
  productsContext = { $implicit: [], columns: productsColumns };
  categoriesContext = { $implicit: [], columns: categoriesColumns };
  blogsContext = { $implicit: [], columns: blogsColumns };

  private productService = inject(ProductsService);
  private categoriesService = inject(CategoriesService);
  private blogsService = inject(BlogpostServices);

  activeIndex = 0;

  ngOnInit() {
    this.loadProducts();

    this.categoriesService
      .categories()
      .pipe(
        map((categories) => {
          return categories
            .map((item: any, index: number) => ({
              id: index + 1,
              name: item,
            }))
            .flat();
        })
      )
      .subscribe({
        next: (response) => {
          this.categoriesContext = {
            ...this.categoriesContext,
            $implicit: response,
          };
        },
      });

    this.blogsService.getData().subscribe({
      next: (response) => {
        // console.log(response); // Inspect the structure of the response
        this.blogsContext = {
          ...this.blogsContext,
          $implicit: response.posts,
        };
      },
      error: (error) => console.error('Error while fetching data:', error),
    });
  }

  private loadProducts() {
    this.productService.products().subscribe({
      next: (response) => {
        this.productsContext = {
          ...this.productsContext,
          $implicit: response,
        };
      },
    });
  }

  // add(row: any) {
  //   console.log(this.activeIndex);
  // }
  // update(row: any) {}
  // remove(row: any) {}



  add(row: any) {
    if (this.activeIndex === 0) { // Products tab
      const newProduct = {
        title: 'New Product',
        category: 'New category',
        description: 'New description'
        // Add other required fields here
      };
      this.productService.addProduct(newProduct).subscribe({
        next: (response) => {
          console.log('Product added:', response);
          this.loadProducts(); // Reload the products list
        },
        error: (error) => console.error('Error adding product:', error)
      });
    }
    // Add logic for other tabs if needed
  }

  update(row: any) {
    if (this.activeIndex === 0) { // Products tab
      const updatedProduct = {
        title: 'Updated ' + row.title,
        // Add other fields to update
      };
      this.productService.updateProduct(row.id, updatedProduct).subscribe({
        next: (response) => {
          console.log('Product updated:', response);
          this.loadProducts(); // Reload the products list
        },
        error: (error) => console.error('Error updating product:', error)
      });
    }
    // Add logic for other tabs if needed
  }

  remove(row: any) {
    if (this.activeIndex === 0) { // Products tab
      this.productService.deleteProduct(row.id).subscribe({
        next: (response) => {
          console.log('Product deleted:', response);
          this.loadProducts(); // Reload the products list
        },
        error: (error) => console.error('Error deleting product:', error)
      });
    }
    // Add logic for other tabs if needed
  }

}
