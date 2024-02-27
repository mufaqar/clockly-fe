import { loginRequest } from '@/lib/authConfig';
import { IPublicClientApplication } from '@azure/msal-browser';

export function getAuthOptions(pca: IPublicClientApplication) {
  return pca
    .acquireTokenSilent({
      scopes: loginRequest.scopes,
      account: pca.getActiveAccount()!,
    })
    .then((response) => {
      const headers = new Headers();
      headers.append('Authorization', `Bearer ${response.accessToken}`);

      return {
        method: 'GET',
        headers: headers,
      } as RequestInit;
    });
}
