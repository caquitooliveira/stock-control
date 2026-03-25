import { ConfirmationService, MessageService } from 'primeng/api';
import { ProductsDataTransferService } from './../../../../shared/services/products/products-data-transfer.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ProductsService } from '../../../../services/products/products.service';
import { Router } from '@angular/router';
import { GetAllProductsResponse } from 'src/app/models/interfaces/products/response/GetAllProductsRespnse';
import { EventAction } from 'src/app/models/interfaces/products/event/EventAction';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ProductFormComponent } from '../../components/product-form/product-form.component';

@Component({
  selector: 'app-products-home',
  templateUrl: './products-home.component.html',
  styleUrls: [],
})
export class ProductsHomeComponent implements OnInit, OnDestroy {

  private readonly destroy$ = new Subject<void>();
  private ref!: DynamicDialogRef;

  public productsDatas: Array<GetAllProductsResponse> = [];

  constructor(
    private productsService: ProductsService,
    private productsDtService: ProductsDataTransferService,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.getServiceProductsDatas();
  }

  getServiceProductsDatas(): void {

    const productLoaded = this.productsService.getProductsDatas();

    if (productLoaded.length) {
      this.productsDatas = productLoaded;
    } else {
      this.getAPIProductsDatas();
    }

  }

  getAPIProductsDatas(): void {
    this.productsService
      .getAllProducts()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: GetAllProductsResponse[]) => {

          this.productsDatas = response;
          this.productsService.setProductDatas(response);

        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao buscar produtos',
            life: 3000,
          });
        },
      });
  }

  handleProductAction(event: EventAction): void {

   if (event) {

    this.ref = this.dialogService.open(ProductFormComponent, {
      header: event?.action,
      width: '80%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
      data: {
        event: event,
        productDatas: this.productsDatas,
      },
    });

    this.ref.onClose
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => this.getAPIProductsDatas(),
      });

  }

  }

  handleDeleteProductAction(event: {
    product_id: string;
    productName: string;
  }): void {

    if (event) {
      this.confirmationService.confirm({
        message: `Tem certeza que deseja excluir o produto "${event?.productName}"?`,
        header: 'Confirmação de Exclusão',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Sim',
        rejectLabel: 'Não',
        accept: () => this.deleteProduct(event?.product_id),
      });
    }

  }

  deleteProduct(product_id: string): void {

    if (product_id) {

      this.productsService
        .deleteProducts(product_id)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {

            if (response) {
              this.messageService.add({
                severity: 'success',
                summary: 'Sucesso',
                detail: 'Produto removido com sucesso!',
                life: 3000,
              });

              this.getAPIProductsDatas();
            }

          },
          error: (err: any) => {
            console.log(err);

            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: 'Erro ao remover o produto!',
              life: 3000,
            });

          },
        });

    }

  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
