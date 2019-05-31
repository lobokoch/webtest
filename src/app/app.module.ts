import { FinanceiroContasPagarTranslationService } from './financeiro/contaspagar/i18n/financeiro-contaspagar-translation.service';
import { PlanoContasTreeService } from './financeiro/planocontas/planocontas-tree/planocontas-tree.service';
import { PlanoContaTreeComponent } from './financeiro/planocontas/planocontas-tree/crud-planoconta-tree.component';
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
import {MenuModule} from 'primeng/menu';
import {PanelMenuModule} from 'primeng/panelmenu';

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

import { ContaPagarComponent } from './financeiro/contaspagar/contapagar/crud-contapagar.component';
import { ContaPagarListComponent } from './financeiro/contaspagar/contapagar/list-contapagar.component';
import { ContaPagarService } from './financeiro/contaspagar/contapagar/contapagar.service';
import { PlanoContaService as FinanceiroContasPagar_PlanoContaService } from './financeiro/contaspagar/planoconta/planoconta.service';
import { BancoService as FinanceiroContasPagar_BancoService } from './financeiro/contaspagar/banco/banco.service';
import { AgenciaBancariaService as FinanceiroContasPagar_AgenciaBancariaService } from './financeiro/contaspagar/agenciabancaria/agenciabancaria.service';
import { ContaBancariaService as FinanceiroContasPagar_ContaBancariaService } from './financeiro/contaspagar/contabancaria/contabancaria.service';
import { CartaoCreditoService as FinanceiroContasPagar_CartaoCreditoService } from './financeiro/contaspagar/cartaocredito/cartaocredito.service';
import { FornecedorService as FinanceiroContasPagar_FornecedorService } from './financeiro/contaspagar/fornecedor/fornecedor.service';

import { FornecedorComponent } from './cadastros/fornecedor/fornecedor/crud-fornecedor.component';
import { FornecedorListComponent } from './cadastros/fornecedor/fornecedor/list-fornecedor.component';
import { FornecedorService } from './cadastros/fornecedor/fornecedor/fornecedor.service';

import { BancoComponent } from './cadastros/banco/banco/crud-banco.component';
import { BancoListComponent } from './cadastros/banco/banco/list-banco.component';
import { BancoService } from './cadastros/banco/banco/banco.service';

import { AgenciaBancariaComponent } from './cadastros/banco/agenciabancaria/crud-agenciabancaria.component';
import { AgenciaBancariaListComponent } from './cadastros/banco/agenciabancaria/list-agenciabancaria.component';
import { AgenciaBancariaService } from './cadastros/banco/agenciabancaria/agenciabancaria.service';

import { BandeiraCartaoComponent } from './cadastros/banco/bandeiracartao/crud-bandeiracartao.component';
import { BandeiraCartaoListComponent } from './cadastros/banco/bandeiracartao/list-bandeiracartao.component';
import { BandeiraCartaoService } from './cadastros/banco/bandeiracartao/bandeiracartao.service';

import { ContaBancariaComponent } from './cadastros/banco/contabancaria/crud-contabancaria.component';
import { ContaBancariaListComponent } from './cadastros/banco/contabancaria/list-contabancaria.component';
import { ContaBancariaService } from './cadastros/banco/contabancaria/contabancaria.service';

import { CartaoCreditoComponent } from './cadastros/banco/cartaocredito/crud-cartaocredito.component';
import { CartaoCreditoListComponent } from './cadastros/banco/cartaocredito/list-cartaocredito.component';
import { CartaoCreditoService } from './cadastros/banco/cartaocredito/cartaocredito.service';
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
import { MenuComponent } from './menu/menu.component';
import { CadastrosFornecedorTranslationService } from './cadastros/fornecedor/i18n/cadastros-fornecedor-translation.service';
import { CadastrosBancoTranslationService } from './cadastros/banco/i18n/cadastros-banco-translation.service';


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

	{ path: 'planoconta/novo', component: PlanoContaTreeComponent, canActivate: [AuthGuard] },
	{ path: 'planoconta/:id', component: PlanoContaTreeComponent, canActivate: [AuthGuard] },
	{ path: 'planoconta', component: PlanoContaTreeComponent, canActivate: [AuthGuard] },
	{ path: 'planoconta/list', component: PlanoContaComponent, canActivate: [AuthGuard] },

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

    PlanoContaTreeComponent,
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
    MenuComponent,
    // Kerubin End

    AppComponent,
    MenuComponent
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
    MenuModule,
    PanelMenuModule,

    CoreModule,
    SecurityModule
  ],
  providers: [
  	// Kerubin Begin
  	PlanoContaService,
  	PlanoContasTreeService,
  	FinanceiroPlanoContasTranslationService,

    ContaPagarService,
    FinanceiroContasPagarTranslationService,
    FinanceiroContasPagar_PlanoContaService,
    FinanceiroContasPagar_BancoService,
    FinanceiroContasPagar_AgenciaBancariaService,
    FinanceiroContasPagar_ContaBancariaService,
    FinanceiroContasPagar_CartaoCreditoService,
    FinanceiroContasPagar_FornecedorService,

  	FornecedorService,
  	BancoService,
  	AgenciaBancariaService,
  	BandeiraCartaoService,
  	ContaBancariaService,
  	CartaoCreditoService,
    KerubinClientesTranslationService,
    CadastrosFornecedorTranslationService,
    CadastrosBancoTranslationService,
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

