import { MessageService } from 'primeng/api';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { GetCategoriesResponse } from 'src/app/models/interfaces/categories/responses/GetCategoriesRespnse';
import { ProductsService } from 'src/app/services/products/products.service';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { EventAction } from 'src/app/models/interfaces/products/event/EventAction';
import { GetAllProductsResponse } from 'src/app/models/interfaces/products/response/GetAllProductsRespnse';
import { ProductsDataTransferService } from 'src/app/shared/services/products/products-data-transfer.service';
import { ProductEvent } from 'src/app/models/enums/products/ProductEvent';
import { SaleProductRequest } from 'src/app/models/interfaces/products/request/SeleProductRequest';
import { Router } from '@angular/router';


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: []
})
export class ProductFormComponent implements OnInit, OnDestroy {

  private readonly destroy$ = new Subject<void>();

  public categoriesDatas: Array<GetCategoriesResponse> = [];
  public selectedCategory: Array<{ name: string; code: string }> = [];

  public productAction!: {
    event: EventAction;
    productDatas: Array<GetAllProductsResponse>;
  };

  public productSelectedDatas!: GetAllProductsResponse;
  public productsDatas: Array<GetAllProductsResponse> = [];

  public addProductForm = this.formBuilder.group({
    name: ['', Validators.required],
    price: ['', Validators.required],
    description: ['', Validators.required],
    category_id: ['', Validators.required],
    amount: [0, Validators.required],
  });

  public editProductForm = this.formBuilder.group({
    name: ['', Validators.required],
    price: ['', Validators.required],
    description: ['', Validators.required],
    amount: [0, Validators.required],
    category_id: ['', Validators.required],
  });

  public saleProductForm = this.formBuilder.group({
    amount: [0, Validators.required],
    product_id: ['', Validators.required],
  });

  public saleProductSelectedDatas!: GetAllProductsResponse;

  public addProductAction = ProductEvent.ADD_PRODUCT_EVENT;
  public editProductAction = ProductEvent.EDIT_PRODUCT_EVENT;
  public saleProductAction = ProductEvent.SALE_PRODUCT_EVENT;
  public renderDropdown = false;

  constructor(
    private categoriesService: CategoriesService,
    private productsService: ProductsService,
    private productsDtService: ProductsDataTransferService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private ref: DynamicDialogConfig,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productAction = this.ref.data;

    this.getAllCategories();

    if (this.productAction?.event?.action === this.saleProductAction) {
      this.getProductDatas();
    }

    this.renderDropdown = true;
  }

  // ================= CATEGORIES =================
  getAllCategories(): void {
    this.categoriesService
      .getAllCategories()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.categoriesDatas = response;

          if (
            this.productAction?.event?.action === this.editProductAction &&
            this.productAction?.productDatas
          ) {
            this.getProductSelectedDatas(
              this.productAction.event.id as string
            );
          }
        },
      });
  }

  // ================= PRODUCTS =================
  getProductDatas(): void {
    this.productsService
      .getAllProducts()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.productsDatas = response;
          this.productsDtService.setProductsDatas(response);
        },
      });
  }

  // ================= ADD PRODUCT =================
  handleSubmitAddProduct(): void {
    if (!this.addProductForm.valid) return;

    const requestCreateProduct = {
      name: this.addProductForm.value.name as string,
      price: this.addProductForm.value.price as string,
      description: this.addProductForm.value.description as string,
      category_id: this.addProductForm.value.category_id as string,
      amount: this.addProductForm.value.amount as number,
    };

    this.productsService
      .creatProduct(requestCreateProduct)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Produto criado com sucesso!',
            life: 3000,
          });
          this.addProductForm.reset();
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Houve um erro ao criar o produto.',
            life: 3000,
          });
        },
      });
  }

  // ================= EDIT PRODUCT =================
handleSubmitEditProduct(): void {
  if (!this.editProductForm.valid || !this.productAction?.event?.id) return;

  const requestEditProduct = {
    name: this.editProductForm.value.name as string,
    price: this.editProductForm.value.price as string,
    description: this.editProductForm.value.description as string,
    amount: this.editProductForm.value.amount as number,
    category_id: this.editProductForm.value.category_id as string,
    product_id: this.productAction.event.id as string,
  };

  this.productsService
    .editProduct(
      this.productAction.event.id as string,
      requestEditProduct
    )
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Produto editado com sucesso!',
          life: 3000,
        });
        this.editProductForm.reset();
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Houve um erro ao editar o produto.',
          life: 3000,
        });
      },
    });
}

  handleSubmitSaleProduct(): void {
    if (this.saleProductForm?.value && this.saleProductForm?.valid) {
      const requestDatas: SaleProductRequest = {
        amount: this.saleProductForm.value?.amount as number,
        product_id: this.saleProductForm.value?.product_id as string,
      };

      this.productsService
        .saleProduct(requestDatas)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            if (response) {
              this.saleProductForm.reset();
              this.getProductDatas();
              this.messageService.add({
                severity: 'success',
                summary: 'Sucesso',
                detail: 'Produto vendido com sucesso!',
                life: 3000,
              });
              this.router.navigate(['/dashboard']);
            }
          },
          error: (err) => {
            console.log(err);
            this.saleProductForm.reset();
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: 'Houve um erro ao vender o produto.',
              life: 3000,
            });
          },
        });
    }
  }

  // ================= SELECT PRODUCT =================
  getProductSelectedDatas(productId: string): void {
    const productFiltered = this.productAction.productDatas.find(
      (product) => product.id === productId
    );

    if (!productFiltered) return;

    this.productSelectedDatas = productFiltered;

    this.editProductForm.setValue({
  name: productFiltered.name || '',
  price: productFiltered.price?.toString() || '',
  description: productFiltered.description || '',
  amount: productFiltered.amount ?? 0,
  category_id: productFiltered.category?.id || '',
});
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
