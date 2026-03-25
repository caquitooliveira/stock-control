import { MessageService } from 'primeng/api';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Subject, takeUntil } from 'rxjs';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { CategoryEvent } from 'src/app/models/enums/products/categories/CategoryEvent';
import { EditCategoryAction } from 'src/app/models/interfaces/categories/event/EditCategoryAction';


@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: []
})
export class CategoryFormComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject();

  public addCategoryAction = CategoryEvent.ADD_CATEGORY_ACTION;
  public editCategoryAction = CategoryEvent.EDIT_CATEGORY_ACTION;

  public categoryAction!: {event: EditCategoryAction};
  public categoryForm = this.FormBuilder.group({
    name: ['', Validators.required],
  });

  constructor(
    public ref: DynamicDialogConfig,
    private FormBuilder: FormBuilder,
    private MessageService: MessageService,
    private CategoriesService: CategoriesService
  ) { }


  ngOnInit(): void {
    this.categoryAction = this.ref.data;

    if (this.categoryAction?.event?.action === this.editCategoryAction && this.categoryAction?.event?.categoryName !== null) {
      this.setCategoryName(this.categoryAction?.event?.categoryName as string);
    }
  }

  handleSubmitCategoryAction(): void {
    if (this.categoryAction?.event?.action === this.addCategoryAction) {
      this.handleSubmitAddCategory();
    } else if (this.categoryAction?.event?.action === this.editCategoryAction) {
      this.handleSubmitEditCategory();
    }

    return;
  }

  handleSubmitAddCategory(): void {
    if (this.categoryForm.valid && this.categoryForm?.valid) {
      const requestCreateCategory: { name: string } = {
        name: this.categoryForm.value.name as string,
      };

      this.CategoriesService.createNewCategory(requestCreateCategory)
      .pipe (takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if (response) {
            this.categoryForm.reset();
          this.MessageService.add({
            severity: 'success',
            summary: 'Successo',
            detail: 'Categoria criada com sucesso',
            life: 3000,
          });
        }
  },
      error: (error) => {
    console.log(error);
    this.categoryForm.reset();
    this.MessageService.add({
      severity: 'error',
      summary: 'Erro',
      detail: 'Ocorreu um erro ao criar a categoria',
      life: 3000,
    });
  },

   });
    }
  }

  handleSubmitEditCategory(): void {
    if (this.categoryForm?.value && this.categoryForm?.valid && this.categoryAction?.event?.id) {
      const requestEditCategory: {
        name: string,
        category_id: string,
      } = {
        name: this.categoryForm?.value?.name as string,
        category_id: this.categoryAction?.event?.id
      };

      this.CategoriesService.editCategoryName(requestEditCategory)
      .pipe (takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.categoryForm.reset();
          this.MessageService.add({
            severity: 'success',
            summary: 'Successo',
            detail: 'Categoria editada com sucesso',
            life: 3000,
          });
        }, error: (error) => {
          console.log(error);
          this.categoryForm.reset();
          this.MessageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Ocorreu um erro ao editar a categoria',
            life: 3000,
          });
        }
      });
    }
  }


  setCategoryName(categoryName: string): void {
    if (categoryName) {
      this.categoryForm.setValue({
        name: categoryName,
      });
    }
  }

  ngOnDestroy(): void {
   this.destroy$.next();
    this.destroy$.complete();
  }
}
