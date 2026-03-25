import { Component, Input, Output, EventEmitter } from '@angular/core';
import { GetAllProductsResponse } from 'src/app/models/interfaces/products/response/GetAllProductsRespnse';
import { ProductEvent } from 'src/app/models/enums/products/ProductEvent';
import { DeleteProductAction } from 'src/app/models/interfaces/products/event/DeleteProductAction';
import { EventAction } from 'src/app/models/interfaces/products/event/EventAction';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: [],
})
export class ProductsTableComponent {

  @Input() products: Array<GetAllProductsResponse> = [];
  @Output() productEvent =new EventEmitter<EventAction>();
  @Output() deleteProductEvent = new EventEmitter<DeleteProductAction>();

  public addProductEvent = ProductEvent.ADD_PRODUCT_EVENT;
  public editProductEvent = ProductEvent.EDIT_PRODUCT_EVENT;
  public porductSelectedEvent!: GetAllProductsResponse;
  productSelected: any;
  productsDatas: any[] = [];

  handleProductEvent(action:string, id?:string): void {
    if (action && action !==''){
      const ProductEventData = id && id !=='' ? { action, id } : { action };
      this.productEvent.emit(ProductEventData);
    }
  }

handleDeleteProduct(product_id: string, productName: string): void {
  this.deleteProductEvent.emit({
    product_id: product_id,
    productName: productName,
   });
}
}

