import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  items: MenuItem[];


  constructor() { }

  ngOnInit() {
    this.loadMenu();
  }

  loadMenu() {
    this.items = [

      {
        label: 'Cadastros',
        icon: 'pi pi-pw',
        items: [

          {
            label: 'Banco',
            icon: 'pi pi-fw ',
            items: [
              { label: 'Banco', icon: 'pi pi-fw', routerLink: '/banco' },
              { label: 'Agência bancária', icon: 'pi pi-fw', routerLink: '/agenciabancaria' },
              { label: 'Conta bancária', icon: 'pi pi-fw', routerLink: '/contabancaria' },
              { label: 'Cartão de crédito', icon: 'pi pi-fw', routerLink: '/cartaocredito' },
              { label: 'Bandeira de cartão', icon: 'pi pi-fw', routerLink: '/bandeiracartao' }
            ]
          },

          {
            label: 'Fornecedor',
            icon: 'pi pi-fw ',
            items: [
              { label: 'Fornecedor', icon: 'pi pi-fw', routerLink: '/fornecedor' }
            ]
          }

        ]
      },

      {
        label: 'Financeiro',
        icon: 'pi pi-pw',
        items: [

          {
            label: 'Plano de contas',
            icon: 'pi pi-fw ',
            items: [
              { label: 'Plano de Contas', icon: 'pi pi-fw', routerLink: '/planoconta' }
            ]
          },

          {
            label: 'Contas a pagar',
            icon: 'pi pi-fw ',
            items: [
              { label: 'Contas a pagar', icon: 'pi pi-fw', routerLink: '/contapagar' }
            ]
          }

        ]
      }


    ];
  }

}
