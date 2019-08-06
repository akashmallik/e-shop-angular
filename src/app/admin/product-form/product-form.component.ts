import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/category.service';
import { ProductService } from 'src/app/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';



@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  categories: Observable<any[]>;
  product = {};
  id: any ;

  constructor(
      private router: Router,
      private route: ActivatedRoute,
      categoryService: CategoryService,
      private productService: ProductService
    ) {
    this.categories = categoryService.getCategories().valueChanges();
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.productService.get(this.id).valueChanges()
      .subscribe(
          p => {
            this.product = p;
          }
        );
    }
  }
  save(product) {
    if (this.id) {
      this.productService.update(this.id, product);
    } else {
      this.productService.create(product);
    }
    this.router.navigate(['/admin/products']);
  }

  delete() {
    if (confirm('Are you sure to delete this?')) {
      this.productService.delete(this.id);
    }
    this.router.navigate(['/admin/products']);
  }

  ngOnInit() {
  }

}
