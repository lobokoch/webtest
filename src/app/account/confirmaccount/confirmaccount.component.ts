import { ActivatedRoute } from '@angular/router';
import { LogoutService } from 'src/app/security/logout.service';
import { AuthService } from './../../security/auth.service';
import { Component, OnInit } from '@angular/core';
import { UserAccountService } from '../useraccount.service';

@Component({
  selector: 'app-confirmaccount',
  templateUrl: './confirmaccount.component.html',
  styleUrls: ['./confirmaccount.component.css']
})
export class ConfirmAccountComponent implements OnInit {

  connected = false;
  btnLabel = 'Ir para página inicial';
  confirmationAccountResult = '';
  id = null;

  constructor(
    private userAccountService: UserAccountService,
    private auth: AuthService,
    private logout: LogoutService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.doLoginAnonymous();
    this.id = this.route.snapshot.queryParams['id'];
  }

  confirmAccount(id: string) {
    if (!id) {
      console.log('Id inválido: ' + id);
      this.confirmationAccountResult = 'O identificador da confirmação é inválido.';
      this.logout.logout();
      return;
    }

    this.userAccountService.confirmAccount(id)
    .then((user) => {
      this.btnLabel = 'Fazer login';
      console.log('Account confirmation successed: ' + user);
      this.confirmationAccountResult = `<h3>Parabéns <strong>${this.getFirstName(user.name)}</strong></h3>` +
      '<p>Sua conta foi ativada com sucesso!</p>' +
      '<p>Faça seu login para acessar o Kerubin.</p>';
      this.logout.logout();
    })
    .catch((e) => {
      console.log('Account confirmation error: '  + e);
      this.confirmationAccountResult = '<h3>Ops :(</h3>' +
        '<p>Ocorreu um erro na ativação da conta. Entre em contato com o serviço de suporte.</p>';
      this.logout.logout();
    });

  }

  private getFirstName(fullName: string): string {
    if (!fullName) {
      return fullName;
    }
    const result = fullName.substring(0, fullName.indexOf(' ')).trim();
    return result;
  }

  private doLoginAnonymous() {
    this.auth.doLoginAnonymous()
    .then((result) => {
      console.log('Anonymous connected!');
      this.connected = true;
      this.confirmAccount(this.id);
    })
    .catch((e) => {
      this.connected = false;
      console.log('Anonymous error: ' + e);
      // this.messageHandler.showError(e);
    });
  }



}
