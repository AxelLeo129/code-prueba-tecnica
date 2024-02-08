import { Component } from '@angular/core';
import { GeneralService } from '../../services/general.service';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * @class StoreComponent
 * @description Componente que gestiona la validación de cupones de descuento en la tienda online.
 */
@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent {

  public couponCode = '';
  public discount: number | undefined = undefined;
  public status: boolean | undefined = undefined;
  public expirationDate: string | undefined = undefined;
  public message: string = "";

  /**
   * Constructor del componente.
   *
   * @param {GeneralService} generalService - Servicio general para realizar peticiones a la API.
   * @param {MatSnackBar} snackBar - Servicio para mostrar notificaciones emergentes en la UI.
   */
  constructor(private generalService: GeneralService, private snackBar: MatSnackBar) {}

  /**
   * Valida el cupón ingresado por el usuario.
   *
   * - Envía una solicitud `PUT` al endpoint `/coupons/{code}`.
   * - Si el cupón es válido, muestra un mensaje de éxito y actualiza `discount`.
   * - Si el cupón es inválido o expirado, muestra un mensaje de error y almacena detalles como `expirationDate` y `status`.
   *
   * @returns {void}
   */
  validateCoupon() {
    this.generalService.put<{ valid: boolean, discount: number }, unknown>(`/coupons`, this.couponCode, null)
      .then((response: any) => {
        this.discount = response.discount;
        this.snackBar.open('Cupón válido', 'Cerrar', { duration: 3000 });
      }).catch((response) => {
        this.discount = 0;
        this.message = response.error.message;
        this.expirationDate = response.error.expiration_date;
        this.status = response.error.status;
        console.log(this.message, this.discount, this.discount === 0 && !this.status)
        this.snackBar.open('Cupón inválido o expirado', 'Cerrar', { duration: 3000 });
      });
  }

}
