export const environment = {
  production: true,

  apiUrl: 'https://www.kerubin.com.br',
  tokenWhitelistedDomains: [ new RegExp('www.kerubin.com.br') ],
  tokenBlacklistedRoutes: [ new RegExp('\/oauth\/token') ]
};
