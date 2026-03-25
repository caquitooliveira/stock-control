import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { GetCategoriesResponse } from 'src/app/models/interfaces/categories/responses/GetCategoriesRespnse';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DeleteCategoryAction } from 'src/app/models/interfaces/categories/event/DeleteCategoryAction';
import { EventAction } from 'src/app/models/interfaces/products/event/EventAction';
import { CategoryFormComponent } from '../../components/category-form/category-form.component';

@Component({
  selector: 'app-categories-home',
  templateUrl: './categories-home.component.html',
  styleUrls: [],
})
export class CategoriesHomeComponent implements OnInit, OnDestroy {

  private readonly destroy$ = new Subject<void>();
  private ref!: DynamicDialogRef;
  public categoriesDatas: Array<GetCategoriesResponse> = [];

  constructor(
    private categoriesService: CategoriesService,
    private dialogService: DialogService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.getAllCategories();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getAllCategories(): void {
    this.categoriesService
      .getAllCategories()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if (response.length > 0) {
            this.categoriesDatas = response;
          }
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao carregar categorias',
            life: 3000,
          });
          this.router.navigate(['/dashboard']);
        },
      });
  }

  handleDeleteCategoryAction(event: DeleteCategoryAction): void {
    if (!event) return;

    this.confirmationService.confirm({
      message: `Tem certeza que deseja excluir a categoria "${event.categoryName}`,
      header: 'Confirmação de Exclusão',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        this.deleteCategory(event?.category_id);
      },
    });
  }

  deleteCategory(category_id: string): void {
    if (category_id) {

    this.categoriesService
      .deleteCategory({ category_id })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.getAllCategories();
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Categoria removida com sucesso!',
            life: 3000,
          });
        },
        error: (err) => {
          console.log(err);
          this.getAllCategories();
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao remover categoria!',
            life: 3000,
          });
        },
      });
      this.getAllCategories();
    }
  }

  handleCategoryAction(event: EventAction): void {
    if (!event) return;

    this.ref = this.dialogService.open(CategoryFormComponent, {
      header: event?.action,
      width: '50%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
      data: {
        event: event,
      },
    });

    this.ref.onClose
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.getAllCategories();
        }
      });
  }
}
