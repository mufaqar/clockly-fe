import { Configuration } from '@azure/msal-browser';

export const msalConfiguration: Configuration = {
  auth: {
    clientId: 'a413e271-e1a1-4794-8074-b52956790268',
    authority: 'https://login.microsoftonline.com/organizations',
    redirectUri: process.env.NEXT_PUBLIC_REDIRECT_URI,
  },
};

export const loginRequest = {
  prompt: 'select_account',
  scopes: ['api://cc812941-35cc-492c-84ac-e77732d8dbcc/Resource.Read'],
};
