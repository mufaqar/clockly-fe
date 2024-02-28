import { Configuration } from '@azure/msal-browser';

export const msalConfiguration: Configuration = {
  auth: {
    clientId: process.env.NEXT_PUBLIC_FE_APPLICATION_ID!,
    authority: 'https://login.microsoftonline.com/organizations',
    redirectUri: process.env.NEXT_PUBLIC_REDIRECT_URI,
  },
};

export const loginRequest = {
  prompt: 'select_account',
  scopes: [`api://${process.env.NEXT_PUBLIC_BE_APPLICATION_ID}/.default`],
};
