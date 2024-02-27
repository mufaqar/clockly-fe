'use client';

import {
  InteractionStatus,
  IPublicClientApplication,
} from '@azure/msal-browser';
import { useMsal } from '@azure/msal-react';
import { Workday } from '@/components/WorkdayList';
import { getAuthOptions } from '@/lib/authOptions';
import { useEffect, useState } from 'react';
import { Workdays } from '@/components/WorkdayEdit';
import { handleError, processResponse } from '@/lib/errorHandling';

export default function Overview() {
  const { instance, inProgress, accounts } = useMsal();
  const [workdays, setWorkdays] = useState<Workday[]>([]);

  useEffect(() => {
    async function loadWorkdays(pca: IPublicClientApplication) {
      const options = await getAuthOptions(pca);

      fetch(
        process.env.NEXT_PUBLIC_BASE_URL + '/api/users/me/workdays',
        options,
      )
        .then(processResponse)
        .then((json: Workdays) => setWorkdays(json.list))
        .catch(handleError);
    }

    if (inProgress === InteractionStatus.None && accounts.length > 0) {
      loadWorkdays(instance);
    }
  }, [inProgress, instance, accounts]);

  return <></>;
}
