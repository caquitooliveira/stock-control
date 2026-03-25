import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';

import { GetAllProductsResponse } from 'src/app/models/interfaces/products/response/GetAllProductsRespnse';
import { DeleteProductResponse } from 'src/app/models/interfaces/products/response/DeleteProductResponse';
import { CreatProductRequest } from 'src/app/models/interfaces/products/request/creatProductRequest';
import { CreatProductResponse } from 'src/app/models/interfaces/products/response/CreatProductResponse';
import { EditProductRequest } from 'src/app/models/interfaces/products/request/EditProductRequest';
import { SaleProductResponse } from 'src/app/models/interfaces/products/response/SaleProductResponse';
import { SaleProductRequest } from 'src/app/models/interfaces/products/request/SeleProductRequest';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private API_URL = environment.API_URL;
  private products: GetAllProductsResponse[] = [];

  constructor(
    private http: HttpClient,
    private cookie: CookieService
  ) {}

  // =========================
  // 🔐 HEADER DINÂMICO (TOKEN)
  // =========================
  private getHeaders() {
    const token = this.cookie.get('USER_INFO');

    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };
  }

  // =========================
  // 📦 CACHE LOCAL
  // =========================

  getProductsDatas(): GetAllProductsResponse[] {
    return this.products;
  }

  setProductDatas(response: GetAllProductsResponse[]): void {
    this.products = response;
  }

  // =========================
  // 🌐 API
  // =========================

  getAllProducts(): Observable<Array<GetAllProductsResponse>> {
    return this.http.get<Array<GetAllProductsResponse>>(
      `${this.API_URL}/products`,
      this.getHeaders()
    ).pipe(
      map((products) => products.filter((data) => data?.amount > 0))
    );
  }

  // 🗑️ DELETE
  deleteProducts(id: string): Observable<DeleteProductResponse> {
    return this.http.delete<DeleteProductResponse>(
      `${this.API_URL}/products/${id}`,
      this.getHeaders()
    );
  }

  // ➕ CREATE
  creatProduct(requestDatas: CreatProductRequest): Observable<CreatProductResponse> {
    return this.http.post<CreatProductResponse>(
      `${this.API_URL}/products`,
      requestDatas,
      this.getHeaders()
    );
  }

  // ✏️ EDIT
  editProduct(id: string, requestDatas: EditProductRequest): Observable<void> {
    return this.http.put<void>(
      `${this.API_URL}/products/${id}`,
      requestDatas,
      this.getHeaders()
    );
  }

  // 💰 SALE
  saleProduct(requestDatas: SaleProductRequest): Observable<SaleProductResponse> {
    return this.http.put<SaleProductResponse>(
      `${this.API_URL}/products/sale`,
      {
        amount: requestDatas.amount,
      },
      {
        ...this.getHeaders(),
        params: {
          product_id: requestDatas.product_id,
        },
      }
    );
  }

}
