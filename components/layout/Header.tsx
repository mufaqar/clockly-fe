import Link from 'next/link';
import { AuthenticatedTemplate, useMsal } from '@azure/msal-react';
import DropdownNotification from '../header/DropdownNotification';
import DropdownUser from '../header/DropdownUser';
import DropdownMessage from '../header/DropdownMessage';
import { useColor } from '@/const/colorcontext';

export default function Header() {
  const { instance } = useMsal();

  function logout() {
    const logoutRequest = {
      account: instance.getActiveAccount(),
      mainWindowRedirectUri: '/',
    };

    instance.logoutPopup(logoutRequest);
  }

  const { selectedColor } = useColor();

  return (
    <div className="supports-backdrop-blur:bg-background/60 fixed left-0 right-0 top-0 z-50 border-b sm:bg-background bg-primary backdrop-blur">
      <nav className="flex h-16 items-center justify-between px-4">
        <Link
          href={'/'}
          className="items-center justify-between gap-2 flex"
        >
          <h1 className="text-lg font-semibold" style={{ color: selectedColor }}>Clockly App</h1>
        </Link>
      </nav>
    </div>
  );
}
