/**********************************************************************************************
Code generated with MKL Plug-in version: 3.5.1
Code generated at time stamp: 2019-06-01T10:38:43.216
Copyright: Kerubin - logokoch@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/

import { HttpClientWithToken } from './../../../security/http-client-token';
import { Injectable } from '@angular/core';
import * as localTranslations from 'src/app/financeiro/planocontas/i18n/pt-br.json';

@Injectable()
export class FinanceiroPlanoContasTranslationService {

  // translations: Object;

  constructor(private http: HttpClientWithToken) {
    // this.loadTranslations();
  }

  /* loadTranslations() {
    this.http.get('src/app/financeiro/planocontas/i18n/pt-br.json')
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
