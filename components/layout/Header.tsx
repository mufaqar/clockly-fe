import Link from 'next/link';
import { AuthenticatedTemplate, useMsal } from '@azure/msal-react';
import DropdownNotification from '../header/DropdownNotification';
import DropdownUser from '../header/DropdownUser';
import DropdownMessage from '../header/DropdownMessage';

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
        <div className="md:w-1/2 w-full flex gap-4 h-16 items-center justify-end px-4">
          <DropdownNotification />
          <DropdownMessage />
          <AuthenticatedTemplate>
          <DropdownUser logout={logout} />
          </AuthenticatedTemplate>
        </div>
      </nav>
    </div>
  );
}
