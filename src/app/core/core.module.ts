import { JwtHelperService } from '@auth0/angular-jwt';

// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Kerubin
import { MessageHandlerService } from './message-handler.service';
import { HttpClientWithToken } from '../security/http-client-token';



@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
  ],
  exports: [ // app.module precisa desses modulos
  ],
  providers: [
    MessageHandlerService,
    HttpClientWithToken,
  	// Kerubin End
    JwtHelperService
  ]
})
export class CoreModule { }

