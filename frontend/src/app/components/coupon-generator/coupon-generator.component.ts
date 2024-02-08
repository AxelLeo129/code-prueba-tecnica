import { Component } from '@angular/core';
import { GeneralService } from '../../services/general.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

/**
 * @class CouponGeneratorComponent
 * @description Componente que gestiona la creación de cupones de descuento a través de un formulario reactivo.
 */
@Component({
  selector: 'app-coupon-generator',
  templateUrl: './coupon-generator.components.html',
  styleUrls: ['./coupon-generator.component.scss']
})
export class CouponGeneratorComponent {

  couponForm: FormGroup;

  /**
   * Constructor del componente.
   *
   * @param {Router} router - Servicio para la navegación entre rutas.
   * @param {GeneralService} generalService - Servicio para realizar peticiones a la API.
   * @param {FormBuilder} fb - Servicio para la construcción del formulario reactivo.
   * @param {MatSnackBar} snackBar - Servicio para mostrar notificaciones emergentes en la UI.
   */
  constructor(private router: Router, private generalService: GeneralService, private fb: FormBuilder, private snackBar: MatSnackBar) {
    this.couponForm = this.createForm();
  }

  /**
   * Crea el formulario reactivo para la generación de cupones.
   *
   * - `code`: Campo obligatorio para el código del cupón.
   * - `discount_percentage`: Número entre 1 y 100.
   * - `expiration_date`: Campo obligatorio para la fecha de expiración.
   *
   * @returns {FormGroup} Objeto FormGroup con las validaciones establecidas.
   */
  createForm(): FormGroup {
    return this.fb.group({
      code: ['', Validators.required],
      discount_percentage: ['', [Validators.required, Validators.min(1), Validators.max(100)]],
      expiration_date: ['', Validators.required]
    });
  }

  /**
   * Envía el formulario para generar un nuevo cupón de descuento.
   *
   * - Si la operación es exitosa, muestra un mensaje y redirige a `/store`.
   * - Si falla, muestra un mensaje de error.
   *
   * @returns {void}
   */
  generateCoupon() {
    this.generalService.post('/coupons', this.couponForm.value)
      .then(() => {
        this.snackBar.open('Cupón generado correctamente', 'Cerrar', { duration: 3000 });
        this.router.navigate(['/store']);
      })
      .catch(() => this.snackBar.open('Error al generar el cupón', 'Cerrar', { duration: 3000 }));
  }

}
