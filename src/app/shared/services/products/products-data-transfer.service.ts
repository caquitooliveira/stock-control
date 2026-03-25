import { Injectable } from '@angular/core';
import { BehaviorSubject, map, take } from 'rxjs';
import { GetAllProductsResponse } from 'src/app/models/interfaces/products/response/GetAllProductsRespnse';

@Injectable({
  providedIn: 'root'
})
export class ProductsDataTransferService {
  setProductsDatas(productsDatas: GetAllProductsResponse[]) {
    throw new Error('Method not implemented.');
  }

  public productsDataEmitter$ = new BehaviorSubject<Array<GetAllProductsResponse> | null>(null);
  public productsDatas: Array<GetAllProductsResponse> = [];

  setProductsData(products: GetAllProductsResponse[]): void {
    if (products){
      this.productsDataEmitter$.next(products);
      this.getProductsDatas();
    }
  }

  getProductsDatas(): void {
    this.productsDataEmitter$
      .pipe(
        take(1),
        map((data) => data?.filter((product) => product.amount > 0) || [])
      )
      .subscribe({
        next: (response) => {
          if (response) {
            this.productsDatas = response;
          }
        }
      });
      return; this.productsDatas;
      }
  }

