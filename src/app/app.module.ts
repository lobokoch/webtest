import { ConfirmationService } from 'primeng/components/common/api';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule, LOCALE_ID } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import localeExtraPT from '@angular/common/locales/extra/pt';

// PrimeNG
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {CalendarModule} from 'primeng/calendar';
import {TableModule} from 'primeng/table';
import {TooltipModule} from 'primeng/tooltip';
import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {PanelModule} from 'primeng/panel';
import {InputSwitchModule} from 'primeng/inputswitch';
import {AccordionModule} from 'primeng/accordion';
import {SpinnerModule} from 'primeng/spinner';
import {SelectButtonModule} from 'primeng/selectbutton';
import {DialogModule} from 'primeng/dialog';
import {DropdownModule} from 'primeng/dropdown';
import {CardModule} from 'primeng/card';
import {TreeModule} from 'primeng/tree';
import {TreeNode} from 'primeng/api';


// CurrencyMask
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { CurrencyMaskConfig, CURRENCY_MASK_CONFIG } from 'ng2-currency-mask/src/currency-mask.config';

// Rotas
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './security/auth.guard';

// Kerubin begin

import { PlanoContaComponent } from './financeiro/planocontas/planoconta/crud-planoconta.component';
import { PlanoContaListComponent } from './financeiro/planocontas/planoconta/list-planoconta.component';
import { PlanoContaService } from './financeiro/planocontas/planoconta/planoconta.service';
import { FinanceiroPlanoContasTranslationService } from './financeiro/planocontas/i18n/financeiro-planocontas-translation.service';

import { ContaPagarComponent } from './kerubin/clientes/contapagar/crud-contapagar.component';
import { ContaPagarListComponent } from './kerubin/clientes/contapagar/list-contapagar.component';
import { ContaPagarService } from './kerubin/clientes/contapagar/contapagar.service';

import { FornecedorComponent } from './kerubin/clientes/fornecedor/crud-fornecedor.component';
import { FornecedorListComponent } from './kerubin/clientes/fornecedor/list-fornecedor.component';
import { FornecedorService } from './kerubin/clientes/fornecedor/fornecedor.service';

import { BancoComponent } from './kerubin/clientes/banco/crud-banco.component';
import { BancoListComponent } from './kerubin/clientes/banco/list-banco.component';
import { BancoService } from './kerubin/clientes/banco/banco.service';

import { AgenciaBancariaComponent } from './kerubin/clientes/agenciabancaria/crud-agenciabancaria.component';
import { AgenciaBancariaListComponent } from './kerubin/clientes/agenciabancaria/list-agenciabancaria.component';
import { AgenciaBancariaService } from './kerubin/clientes/agenciabancaria/agenciabancaria.service';

import { BandeiraCartaoComponent } from './kerubin/clientes/bandeiracartao/crud-bandeiracartao.component';
import { BandeiraCartaoListComponent } from './kerubin/clientes/bandeiracartao/list-bandeiracartao.component';
import { BandeiraCartaoService } from './kerubin/clientes/bandeiracartao/bandeiracartao.service';

import { ContaBancariaComponent } from './kerubin/clientes/contabancaria/crud-contabancaria.component';
import { ContaBancariaListComponent } from './kerubin/clientes/contabancaria/list-contabancaria.component';
import { ContaBancariaService } from './kerubin/clientes/contabancaria/contabancaria.service';

import { CartaoCreditoComponent } from './kerubin/clientes/cartaocredito/crud-cartaocredito.component';
import { CartaoCreditoListComponent } from './kerubin/clientes/cartaocredito/list-cartaocredito.component';
import { CartaoCreditoService } from './kerubin/clientes/cartaocredito/cartaocredito.service';
import { KerubinClientesTranslationService } from './kerubin/clientes/i18n/kerubin-clientes-translation.service';

import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './security/login/login.component';
import { SecurityModule } from './security/security.module';
import { CoreModule } from './core/core.module';
import { NewAccountComponent } from './account/newaccount/newaccount.component';
import { ConfirmAccountComponent } from './account/confirmaccount/confirmaccount.component';
import { ConfigNewAccountComponent } from './account/confignewaccount/confignewaccount.component';
import { UserAccountService } from './account/useraccount.service';
import { FocusDirective } from './directive/focus.directive';

// Kerubin end

registerLocaleData(localePt, 'pt', localeExtraPT);

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
  align: 'right',
  allowNegative: true,
  decimal: ',',
  precision: 2,
  // prefix: 'R$ ',
  prefix: '',
  suffix: '',
  thousands: '.'
};

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

	// Kerubin Begin

	{ path: 'planoconta/novo', component: PlanoContaComponent, canActivate: [AuthGuard] },
	{ path: 'planoconta/:id', component: PlanoContaComponent, canActivate: [AuthGuard] },
	{ path: 'planoconta', component: PlanoContaListComponent, canActivate: [AuthGuard] },

	{ path: 'contapagar/novo', component: ContaPagarComponent, canActivate: [AuthGuard] },
	{ path: 'contapagar/:id', component: ContaPagarComponent, canActivate: [AuthGuard] },
	{ path: 'contapagar', component: ContaPagarListComponent, canActivate: [AuthGuard] },

	{ path: 'fornecedor/novo', component: FornecedorComponent, canActivate: [AuthGuard] },
	{ path: 'fornecedor/:id', component: FornecedorComponent, canActivate: [AuthGuard] },
	{ path: 'fornecedor', component: FornecedorListComponent, canActivate: [AuthGuard] },

	{ path: 'banco/novo', component: BancoComponent, canActivate: [AuthGuard] },
	{ path: 'banco/:id', component: BancoComponent, canActivate: [AuthGuard] },
	{ path: 'banco', component: BancoListComponent, canActivate: [AuthGuard] },

	{ path: 'agenciabancaria/novo', component: AgenciaBancariaComponent, canActivate: [AuthGuard] },
	{ path: 'agenciabancaria/:id', component: AgenciaBancariaComponent, canActivate: [AuthGuard] },
	{ path: 'agenciabancaria', component: AgenciaBancariaListComponent, canActivate: [AuthGuard] },

	{ path: 'bandeiracartao/novo', component: BandeiraCartaoComponent, canActivate: [AuthGuard] },
	{ path: 'bandeiracartao/:id', component: BandeiraCartaoComponent, canActivate: [AuthGuard] },
	{ path: 'bandeiracartao', component: BandeiraCartaoListComponent, canActivate: [AuthGuard] },

	{ path: 'contabancaria/novo', component: ContaBancariaComponent, canActivate: [AuthGuard] },
	{ path: 'contabancaria/:id', component: ContaBancariaComponent, canActivate: [AuthGuard] },
	{ path: 'contabancaria', component: ContaBancariaListComponent, canActivate: [AuthGuard] },

	{ path: 'cartaocredito/novo', component: CartaoCreditoComponent, canActivate: [AuthGuard] },
	{ path: 'cartaocredito/:id', component: CartaoCreditoComponent, canActivate: [AuthGuard] },
	{ path: 'cartaocredito', component: CartaoCreditoListComponent, canActivate: [AuthGuard] },
	// Kerubin Begin

  { path: 'mainmenu', component: ContaPagarListComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'confignewaccount', component: ConfigNewAccountComponent },
  { path: 'newaccount', component: NewAccountComponent },
  { path: 'confirmaccount', component: ConfirmAccountComponent }
];



@NgModule({
  declarations: [
    // Kerubin Begin

    PlanoContaComponent,
    PlanoContaListComponent,

    ContaPagarComponent,
    ContaPagarListComponent,

    FornecedorComponent,
    FornecedorListComponent,

    BancoComponent,
    BancoListComponent,

    AgenciaBancariaComponent,
    AgenciaBancariaListComponent,

    BandeiraCartaoComponent,
    BandeiraCartaoListComponent,

    ContaBancariaComponent,
    ContaBancariaListComponent,

    CartaoCreditoComponent,
    CartaoCreditoListComponent,
    NavbarComponent,
    LoginComponent,
    NewAccountComponent,
    ConfirmAccountComponent,
    ConfigNewAccountComponent,
    FocusDirective,
    // Kerubin End

    AppComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,

    CurrencyMaskModule,

    // PrimeNG
    InputTextModule,
    ButtonModule,
    InputTextareaModule,
    CalendarModule,
    TableModule,
    TooltipModule,
    ToastModule,
    ConfirmDialogModule,
    AutoCompleteModule,
    PanelModule,
    InputSwitchModule,
    AccordionModule,
    SpinnerModule,
    SelectButtonModule,
    DialogModule,
    DropdownModule,
    CardModule,
    TreeModule,

    CoreModule,
    SecurityModule
  ],
  providers: [
  	// Kerubin Begin
  	PlanoContaService,
  	FinanceiroPlanoContasTranslationService,

  	ContaPagarService,
  	FornecedorService,
  	BancoService,
  	AgenciaBancariaService,
  	BandeiraCartaoService,
  	ContaBancariaService,
  	CartaoCreditoService,
  	KerubinClientesTranslationService,
  	UserAccountService,
  	// Kerubin End

    MessageService,
    ConfirmationService,
    { provide: LOCALE_ID, useValue: 'pt' },
    { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig }
  ],
  bootstrap: [AppComponent]
})

export class AppModule {

}

