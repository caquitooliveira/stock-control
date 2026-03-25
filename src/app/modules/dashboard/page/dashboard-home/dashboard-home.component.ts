import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ProductsService } from 'src/app/services/products/products.service';
import { GetAllProductsResponse } from 'src/app/models/interfaces/products/response/GetAllProductsRespnse';
import { ProductsDataTransferService } from 'src/app/shared/services/products/products-data-transfer.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ChartData, ChartOptions } from 'chart.js';
import 'chart.js/auto';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: []
})
export class DashboardHomeComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<void>();

  public productsList: Array<GetAllProductsResponse> = [];

  public productsChartDatas!: ChartData<'bar'>;
  public productsChartOptions!: ChartOptions<'bar'>;

  constructor(
    private productsService: ProductsService,
    private messageService: MessageService,
    private productsDataTransferService: ProductsDataTransferService
  ) {}

  ngOnInit(): void {
    this.getProductsDatas();
  }

  getProductsDatas(): void {
    this.productsService.getAllProducts()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if (response.length > 0) {
            this.productsList = response;
            this.productsDataTransferService.setProductsData(this.productsList);
            this.setProductsChartConfig();
          }
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao buscar produtos.',
            life: 2500
          });
        }
      });
  }

  setProductsChartConfig(): void {
    if (this.productsList.length >0) {
    const documentStyle = getComputedStyle(document.documentElement);

    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.productsChartDatas = {
      labels: this.productsList.map(product => product.name),
      datasets: [
        {
          label: 'Quantidade',
          data: this.productsList.map(product => product.amount),
          backgroundColor: documentStyle.getPropertyValue('--indigo-500'),
          borderColor: documentStyle.getPropertyValue('--indigo-500'),
          hoverBackgroundColor: documentStyle.getPropertyValue('--indigo-700')
        }
      ]
    };

    this.productsChartOptions = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
            font: {
              weight: 500
            }
          },
          grid: {
            color: surfaceBorder
          }
        },
        y: {
          beginAtZero: true,
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder
          }
        }
      }
    };
  }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
