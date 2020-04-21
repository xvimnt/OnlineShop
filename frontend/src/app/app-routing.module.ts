import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Importar los componentes para las rutas
import {LoginComponent} from './Components/login/login.component';
import { PageNotFoundComponent } from './Components/page-not-found/page-not-found.component';
import { MainPageComponent } from './Components/main-page/main-page.component';
import { RegistrationComponent } from './Components/registration/registration.component';
import { ShopComponent } from './Components/shop/shop.component';
import { AdminComponent } from './Components/admin/admin.component';


const routes: Routes = [
  {path:'',redirectTo:'/alie-sell',pathMatch:'full'},
  {path:'alie-sell',component:MainPageComponent},
  {path:'login',component:LoginComponent},
  {path:'registration',component:RegistrationComponent},
  {path:'shop',component:ShopComponent},
  {path:'admin',component:AdminComponent},
  {path:'**',component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
