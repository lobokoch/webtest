/**********************************************************************************************
Code generated with MKL Plug-in version: 3.4.1
Code generated at time stamp: 2019-05-30T20:21:52.385
Copyright: Kerubin - logokoch@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/

import { HttpClientWithToken } from './../../../security/http-client-token';
import { Injectable } from '@angular/core';
import * as localTranslations from 'src/app/cadastros/fornecedor/i18n/pt-br.json';

@Injectable()
export class CadastrosFornecedorTranslationService {

  // translations: Object;

  constructor(private http: HttpClientWithToken) {
    // this.loadTranslations();
  }

  /* loadTranslations() {
    this.http.get('src/app/cadastros/fornecedor/i18n/pt-br.json')
    .toPromise()
    .then(response => {
      this.translations = response;
    })
    .catch(error => {
      console.log(`Error loading translations: ${error}`);
    });
  } */

  public getTranslation(key: string): string {
      if (localTranslations) {
        const translation = (<any>localTranslations).default[key];
        if (translation !== null) {
          return translation;
        }
      }
      return key;
  }

}
