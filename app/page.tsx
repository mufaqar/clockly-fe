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
import DateCalendar from '@/components/DateCalander';

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
    <div className='sm:p-8 p-7'>
      <div className='sm:block hidden'>
        <h1 className='sm:text-5xl text-2xl font-normal text-primary'>
          Arbeitstag & Aufgaben
        </h1>
        <p className='text-base font-normal text-foreground/85 my-5'>
          Bitte erfassen Sie hier Anfang und Ende des Arbeitstages, sowie die Pausenzeit. Aufgaben....
        </p>
      </div>
      <WorkdayEdit
        timestamp={timestamp}
        onSelect={(workday) => {
          setWorkday(workday);
          resetTimeRecord(workday);
        }}
        onDeleted={reload}
        timeRecordEditKey={() => timeRecordEditKey}
        timeRecord={timeRecord}
        availableTasks={availableTasks}
        reload={reload}
        resetTimeRecord={resetTimeRecord} />
      <div>
        <WorkdayList
          workday={workday}
          onEdit={(timeRecord) => {
            resetTimeRecord(workday, timeRecord);
          }}
          onDeleted={reload} />
      </div>
    </div>
  );
}
