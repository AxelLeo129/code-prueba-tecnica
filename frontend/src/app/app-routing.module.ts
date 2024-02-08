import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CouponGeneratorComponent } from './components/coupon-generator/coupon-generator.component';
import { StoreComponent } from './components/store/store.component';

const routes: Routes = [
  { path: 'generate-coupon', component: CouponGeneratorComponent },
  { path: 'store', component: StoreComponent },
  { path: '', redirectTo: 'store', pathMatch: 'full' }, // Redirección a tienda por defecto
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
