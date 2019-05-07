import { AuthService } from './../../security/auth.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UserAccountService } from '../useraccount.service';
import { UserAccount, AccountCreatedDTO } from './useraccount.model';
import { MessageHandlerService } from 'src/app/core/message-handler.service';
import { LogoutService } from 'src/app/security/logout.service';

@Component({
  selector: 'app-newaccount',
  templateUrl: './newaccount.component.html',
  styleUrls: ['./newaccount.component.css']
})
export class NewAccountComponent implements OnInit {

  userAccount = new UserAccount();
  connected = false;
  createdAccountResult = '';
  accountCreated = false;
  btnLabel = 'Criar conta';
  disabled = false;
  touched = false;

  constructor(
    private userAccountService: UserAccountService,
    private messageHandler: MessageHandlerService,
    private auth: AuthService,
    private logout: LogoutService
  ) { }

  ngOnInit() {
    this.doLoginAnonymous();
  }

  validateAllFormFields(form: FormGroup) {
  Object.keys(form.controls).forEach(field => {
    const control = form.get(field);
    if (control instanceof FormControl) {
      // control.markAsTouched({ onlySelf: true });
      control.markAsDirty({ onlySelf: true });
    } else if (control instanceof FormGroup) {
      this.validateAllFormFields(control);
    }
  });
  }

  createAccount(form: FormGroup/*FormControl*/) {
    if (!form.valid) {
      this.validateAllFormFields(form);
      return;
    }

    this.disabled = true;
    this.btnLabel = 'Criando a conta, aguarde...';
    this.userAccountService.createAccount(this.userAccount)
    .then((response) => {
      this.disabled = false;
      this.btnLabel = 'Conta criada!';
      this.createdAccountResult = response.text;
      this.accountCreated = true;
      this.logout.logout();
    })
    .catch((e) => {
      this.disabled = false;
      this.btnLabel = 'Erro!';
      this.createdAccountResult = e;
      this.accountCreated = true;
      this.logout.logout();
    });
  }

  private doLoginAnonymous() {
    this.auth.doLoginAnonymous()
    .then((result) => {
      console.log('Anonymous connected!');
      this.connected = true;
    })
    .catch((e) => {
      this.connected = false;
      this.messageHandler.showError(e);
    });
  }

  /*private doLoginAnonymous() {
    const username = 'anonymous@kerubin.com.br';
    const password = 'Kerubin_Anonymous@!1';
    this.auth.login(username, password)
    .then(() => {
      console.log('Anonymous connected!');
      this.connected = true;
    })
    .catch (error => {
      this.connected = false;
      this.messageHandler.showError(error);
    });
  }*/


}
