import Link from 'next/link';
import { AuthenticatedTemplate, useMsal } from '@azure/msal-react';

export default function Header() {
  const { instance } = useMsal();

  function logout() {
    const logoutRequest = {
      account: instance.getActiveAccount(),
      mainWindowRedirectUri: '/',
    };

    instance.logoutPopup(logoutRequest);
  }

  return (
    <div className="supports-backdrop-blur:bg-background/60 fixed left-0 right-0 top-0 z-20 border-b bg-background/95 backdrop-blur">
      <nav className="flex h-16 items-center justify-between px-4">
        <Link
          href={'/'}
          className="hidden items-center justify-between gap-2 md:flex"
        >
          <h1 className="text-lg font-semibold">Clockly App</h1>
        </Link>
        <div className="flex h-16 items-center justify-end px-4">
          <AuthenticatedTemplate>
            <button onClick={logout}>Logout</button>
          </AuthenticatedTemplate>
        </div>
      </nav>
    </div>
  );
}
