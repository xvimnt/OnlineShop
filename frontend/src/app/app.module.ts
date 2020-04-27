import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// Modulos para conectar con nodejs
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
// Modulos de interfaz
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FeaturesComponent } from './Components/features/features.component';
import { PortfolioComponent } from './Components/portfolio/portfolio.component';
import { MarketingComponent } from './Components/marketing/marketing.component';
import { ActionComponent } from './Components/action/action.component';
import { NavigationComponent } from './Components/navigation/navigation.component';
import { FooterComponent } from './Components/footer/footer.component';
import { CardsComponent } from './Components/cards/cards.component';
import { LoginComponent } from './Components/login/login.component';
import { PageNotFoundComponent } from './Components/page-not-found/page-not-found.component';
import { MainPageComponent } from './Components/main-page/main-page.component';
import { RegistrationComponent } from './Components/registration/registration.component';
import { ShopComponent } from './Components/shop/shop.component';
import { AdminComponent } from './Components/admin/admin.component';
import { ShippingCartComponent } from './Components/shipping-cart/shipping-cart.component';
import { TopBarShopComponent } from './top-bar-shop/top-bar-shop.component';
import { ConfirmEmailComponent } from './Components/confirm-email/confirm-email.component';
import { AdminCardsComponent } from './Components/admin-cards/admin-cards.component';

@NgModule({
  declarations: [
    AppComponent,
    FeaturesComponent,
    PortfolioComponent,
    MarketingComponent,
    ActionComponent,
    NavigationComponent,
    FooterComponent,
    CardsComponent,
    LoginComponent,
    PageNotFoundComponent,
    MainPageComponent,
    RegistrationComponent,
    ShopComponent,
    AdminComponent,
    ShippingCartComponent,
    TopBarShopComponent,
    ConfirmEmailComponent,
    AdminCardsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
