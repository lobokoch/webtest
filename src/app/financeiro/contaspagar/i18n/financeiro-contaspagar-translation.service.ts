/**********************************************************************************************
Code generated with MKL Plug-in version: 3.0.2
Code generated at time stamp: 2019-05-28T21:35:52.612
Copyright: Kerubin - logokoch@gmail.com

WARNING: DO NOT CHANGE THIS CODE BECAUSE THE CHANGES WILL BE LOST IN THE NEXT CODE GENERATION.
***********************************************************************************************/

import { HttpClientWithToken } from './../../../security/http-client-token';
import { Injectable } from '@angular/core';
import * as localTranslations from 'src/app/financeiro/contaspagar/i18n/pt-br.json';

@Injectable()
export class FinanceiroContasPagarTranslationService {

  // translations: Object;

  constructor(private http: HttpClientWithToken) {
    // this.loadTranslations();
  }

  /* loadTranslations() {
    this.http.get('src/app/financeiro/contaspagar/i18n/pt-br.json')
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
