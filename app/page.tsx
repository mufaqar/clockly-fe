'use client';

import { useMsal } from '@azure/msal-react';
import { useEffect, useState } from 'react';
import { intervalToDuration } from 'date-fns';
import {
  InteractionStatus,
  IPublicClientApplication,
} from '@azure/msal-browser';
import WorkdayEdit from '@/components/WorkdayEdit';
import TimeRecordEdit, { defaultTimeRecord } from '@/components/TimeRecordEdit';
import WorkdayList, {
  Task,
  TimeRecord,
  Workday,
} from '@/components/WorkdayList';
import { getAuthOptions } from '@/lib/authOptions';
import { handleError, processResponse } from '@/lib/errorHandling';

export default function Home() {
  const { instance, inProgress, accounts } = useMsal();
  const [availableTasks, setAvailableTasks] = useState<Task[]>([]);
  const [workday, setWorkday] = useState<Workday>();
  const [timeRecord, setTimeRecord] = useState<TimeRecord>(defaultTimeRecord);
  const now = Date.now();
  const [timestamp, setTimestamp] = useState(now);
  const [timeRecordEditKey, setTimeRecordEditKey] = useState(now);

  useEffect(() => {
    async function loadTasks(pca: IPublicClientApplication) {
      const options = await getAuthOptions(pca);

      fetch(
        process.env.NEXT_PUBLIC_BASE_URL + '/api/users/me/assignedtasks',
        options,
      )
        .then(processResponse)
        .then((json: { list: Task[] }) => {
          setAvailableTasks(json.list);
        })
        .catch(handleError);
    }

    if (inProgress === InteractionStatus.None && accounts.length > 0) {
      loadTasks(instance);
    }
  }, [inProgress, instance, accounts]);

  function reload() {
    setTimestamp(Date.now());
  }

  function resetTimeRecord(
    workday?: Workday,
    timeRecord: TimeRecord = defaultTimeRecord,
  ) {
    setTimeRecordEditKey(Date.now());

    if (timeRecord === defaultTimeRecord) {
      const newTimeRecord = { ...timeRecord } as TimeRecord;
      if (
        workday &&
        workday.start != null &&
        workday.end != null &&
        workday.workBreak != null
      ) {
        const { hours, minutes } = intervalToDuration({
          start: workday.start,
          end: workday.end,
        });
        const worktime = (hours || 0) + (minutes || 0) / 60 - workday.workBreak;

        const tasktime = workday.timeRecords.reduce(
          (acc, { duration }) => acc + (duration || 0),
          0,
        );

        newTimeRecord.duration = Math.round((worktime - tasktime) * 4) / 4;
      }
      setTimeRecord(newTimeRecord);
    } else {
      setTimeRecord(timeRecord);
    }
  }

  return (
    <div className="grid lg:grid-cols-5 grid-cols-1 p-8 gap-8">
      <div className="lg:col-span-2 col-span-1">
        <WorkdayEdit
          timestamp={timestamp}
          onSelect={(workday) => {
            setWorkday(workday);
            resetTimeRecord(workday);
          }}
          onDeleted={reload}
        />
      </div>
      <div className="lg:col-span-3 col-span-1">
        <TimeRecordEdit
          key={timeRecordEditKey}
          workdayId={workday?.id}
          timeRecord={timeRecord}
          availableTasks={availableTasks}
          onSaved={reload}
          onNew={() => resetTimeRecord(workday)}
        />
        <WorkdayList
          workday={workday}
          onEdit={(timeRecord) => {
            resetTimeRecord(workday, timeRecord);
          }}
          onDeleted={reload}
        />
      </div>
    </div>
  );
}
