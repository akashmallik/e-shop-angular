import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/product.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
// import { NgProgress } from '@ngx-progressbar';


@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit {
  products = [];

  constructor(private productService: ProductService, ) {
    // public ngProgress: NgProgress
    // this.ngProgress.start();
    this.productService.getAll().snapshotChanges().pipe(
      map(actions =>
        actions.map(a => ({ key: a.key, ...a.payload.val() }))
      )
    ).subscribe(data => {
      this.products = data;
      // this.ngProgress.done();
    });
  }

  ngOnInit() {
  }

}
