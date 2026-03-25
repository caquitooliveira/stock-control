import { DialogService } from 'primeng/dynamicdialog';
import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ProductFormComponent } from 'src/app/modules/products/components/product-form/product-form.component';
import { ProductEvent } from 'src/app/models/enums/products/ProductEvent';

@Component({
  selector: 'app-toolbar-navigation',
  templateUrl: './toolbar-navigation-component.component.html',
  styleUrls: [],
})
export class ToolbarNavigationComponentComponent {

  constructor(private cookie: CookieService, private router: Router, private DialogService: DialogService){}

  handleLogout(): void {
    this.cookie.delete('USER_INFO');
    void this.router.navigate(['/home']);
  }

  handleSellProducts(): void {
    const saleProductAction = ProductEvent.SALE_PRODUCT_EVENT;

    this.DialogService.open(ProductFormComponent, {
      header: ProductEvent.SALE_PRODUCT_EVENT,
      width: '50%',
      contentStyle: {  overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
      data: {
        event: {action: ProductEvent.SALE_PRODUCT_EVENT},
      },
    });
  }
}
