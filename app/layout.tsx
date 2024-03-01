'use client';

import { Inter } from 'next/font/google';
import './globals.css';
import 'react-toastify/dist/ReactToastify.css';
import {
  MsalAuthenticationTemplate,
  MsalProvider,
  UnauthenticatedTemplate,
} from '@azure/msal-react';
import {
  AuthenticationResult,
  EventType,
  InteractionType,
  PublicClientApplication,
} from '@azure/msal-browser';
import { useEffect, useState } from 'react';
import { loginRequest, msalConfiguration } from '@/lib/authConfig';
import Header from '@/components/layout/Header';
import { cn } from '@/lib/style';
import Sidebar from '@/components/layout/Sidebar';
import { ToastContainer } from 'react-toastify';
import { ColorProvider } from '@/const/colorcontext';

const inter = Inter({ subsets: ['latin'] });

const pca = new PublicClientApplication(msalConfiguration);

pca.initialize().then(() => {
  const accounts = pca.getAllAccounts();
  if (accounts.length > 0) {
    pca.setActiveAccount(accounts[0]);
  }

  pca.addEventCallback((message) => {
    if (
      message.eventType === EventType.LOGIN_SUCCESS &&
      (message.payload as AuthenticationResult).account
    ) {
      const account = (message.payload as AuthenticationResult).account;
      pca.setActiveAccount(account);
    } else if (message.eventType === EventType.LOGIN_FAILURE) {
      console.error(`[${message.eventType}]: ${message.error}`);
    }
  });
});

const ErrorComponent = () => {
  return (
    <div className="flex items-center justify-center mt-3">
      Bei der Anmeldung ist ein Fehler aufgetreten.
    </div>
  );
};

const LoadingComponent = () => {
  return (
    <div className="flex items-center justify-center mt-3">
      Anmeldung läuft...
    </div>
  );
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <html lang="de">
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          inter.className,
        )}
      >
        <ColorProvider>
          {isClient ? (
            <MsalProvider instance={pca}>
              <Header />
              <div className="flex h-screen border-collapse overflow-hidden bg-gray-50">
                <Sidebar />
                <main className="flex-1 overflow-y-auto overflow-x-hidden pt-16 bg-secondary/10 pb-1">
                  <UnauthenticatedTemplate>
                    <div className="flex items-center justify-center mt-3">
                      Im Moment ist kein Benutzer angemeldet.
                    </div>
                  </UnauthenticatedTemplate>
                  <MsalAuthenticationTemplate
                    interactionType={InteractionType.Redirect}
                    authenticationRequest={loginRequest}
                    errorComponent={ErrorComponent}
                    loadingComponent={LoadingComponent}
                  >
                    {children}
                  </MsalAuthenticationTemplate>

                </main>
              </div>
              <ToastContainer hideProgressBar={true} autoClose={10000} />
            </MsalProvider>
          ) : (
            <></>
          )}
        </ColorProvider>
      </body>
    </html>
  );
}
