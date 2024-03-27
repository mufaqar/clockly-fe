import { useMsal } from '@azure/msal-react';
import { addDays, format } from 'date-fns';
import { useEffect, useState } from 'react';
import TimeInput from '@/components/TimeInput';
import {
  InteractionStatus,
  IPublicClientApplication,
} from '@azure/msal-browser';
import { Workday } from '@/components/WorkdayList';
import DurationInput from '@/components/DurationInput';
import DateInput from '@/components/DateInput';
import { getAuthOptions } from '@/lib/authOptions';
import { handleError, processResponse } from '@/lib/errorHandling';
import { FaCalendarAlt } from 'react-icons/fa';
import { CiCalendarDate } from 'react-icons/ci';
import { IoCalendarNumberSharp } from 'react-icons/io5';
import TimeRecordEdit from './TimeRecordEdit';
import DateCalendarWrapper from './DateCalander';

export interface Workdays {
  list: Workday[];
}

interface Props {
  timestamp: number;
  onSelect: (workday: Workday) => void;
  onDeleted: () => void;
  timeRecordEditKey: () => string | number; // Change type to accept a function returning string or number
  timeRecord: any;
  availableTasks: any;
  reload: () => void;
  resetTimeRecord: () => void;
}

export default function WorkdayEdit({ timeRecordEditKey, timeRecord, availableTasks, reload, resetTimeRecord, timestamp, onSelect, onDeleted }: Props) {
  const DATE_PATTERN = 'yyyy-MM-dd';

  const { instance, inProgress, accounts } = useMsal();
  const [selectedDate, setSelectedDate] = useState(
    new Date(new Date().setHours(0, 0, 0, 0)),
  );
  const [workday, setWorkday] = useState<Workday>(defaultWorkday(selectedDate));

  useEffect(() => {
    async function loadWorkday(pca: IPublicClientApplication) {
      const options = await getAuthOptions(pca);

      fetch(
        process.env.NEXT_PUBLIC_BASE_URL +
        `/api/users/me/workdays?after=${selectedDate.toISOString()}&before=${addDays(selectedDate, 1).toISOString()}`,
        options,
      )
        .then(processResponse)
        .then((json: Workdays) => {
          propagateWorkday(
            json.list?.length ? json.list[0] : defaultWorkday(selectedDate),
          );
        })
        .catch(handleError);
    }

    if (inProgress === InteractionStatus.None && accounts.length > 0) {
      loadWorkday(instance);
    }
  }, [timestamp, selectedDate, inProgress, instance, accounts]);

  function defaultWorkday(startDateMidnight: Date): Workday {
    return {
      start: new Date(
        new Date(startDateMidnight).setHours(8, 0, 0, 0),
      ).toISOString(),
      end: null,
      workBreak: 0.5,
      timeRecords: [],
    };
  }

  function propagateWorkday(workday: Workday) {
    setWorkday(workday);
    onSelect(workday);
  }

  async function submit(workday: Workday) {
    const options = await getAuthOptions(instance);

    const headers = new Headers(options!.headers);
    headers.append('Content-Type', 'application/json');

    await fetch(
      process.env.NEXT_PUBLIC_BASE_URL +
      '/api/users/me/workdays' +
      (workday.id ? `/${workday.id}` : ''),
      {
        ...options,
        headers: headers,
        method: workday.id ? 'PUT' : 'POST',
        body: JSON.stringify(workday),
      },
    )
      .then(processResponse)
      .then(propagateWorkday)
      .catch(handleError);
  }

  async function remove(workday: Workday) {
    const options = await getAuthOptions(instance);

    await fetch(
      process.env.NEXT_PUBLIC_BASE_URL +
      `/api/users/me/workdays/${workday!.id}`,
      {
        ...options,
        method: 'DELETE',
      },
    )
      .then(processResponse)
      .catch(handleError);

    onDeleted();
  }

  function handleChange(name: string, value: any) {
    setWorkday((workday) => {
      return {
        ...workday,
        [name]: value,
      };
    });
  }

  return (
    <div className='grid lg:grid-cols-6 grid-cols-1 sm:gap-14 gap-8'>
      <div className="lg:col-span-2 col-span-1">
        <DateInput
          id="startDate"
          name="start"
          value={
            workday.start ? format(new Date(workday.start), DATE_PATTERN) : null
          }
          handleChange={(value) => handleChange('start', value)}
        />
      </div>
      <div className="lg:col-span-4 col-span-1 flex flex-col gap-5">
        <div className="bg-card shadow-[0_8px_10px_1px_rgba(0,0,0,0.14)] rounded-lg sm:p-8 p-5">
          <h2 className='md:text-2xl text-xl font-normal sm:text-foreground/85 text-primary mb-5'>
            Arbeitstag
          </h2>
          <div className="grid sm:grid-cols-4 grid-cols-2 gap-4">
            <div className="col-span-1">
              <label
                htmlFor="startTime"
                className="flex items-center text-xs font-normal leading-6 text-foreground mb-[-13px] ml-3.5 bg-card px-1.5 w-fit z-10 relative"
              >
                Beginn
              </label>
              <TimeInput
                id="startTime"
                name="start"
                value={workday.start}
                reference={workday.start}
                handleChange={(value) => handleChange('start', value)}
              />
            </div>
            <div className="col-span-1">
              <label
                htmlFor="end"
                className="flex items-center text-xs font-normal leading-6 text-foreground mb-[-13px] ml-3.5 bg-card px-1.5 w-fit z-10 relative"
              >
                Ende
              </label>
              <TimeInput
                name="end"
                value={workday.end}
                reference={workday.start}
                handleChange={(value) => handleChange('end', value)}
              />
            </div>
            <div className="col-span-1">
              <label
                htmlFor="workBreak"
                className="flex items-center text-xs font-normal leading-6 text-foreground mb-[-13px] ml-3.5 bg-card px-1.5 w-fit z-10 relative"
              >
                Pause
              </label>
              <DurationInput
                name="workBreak"
                value={workday.workBreak}
                handleChange={(value) => handleChange('workBreak', value)}
              />
            </div>
            <div className="col-span-1 flex gap-1 justify-end items-end">
              <button
                className="sm:text-sm text-xs font-medium uppercase items-center justify-center bg-primary px-1.5 py-4 text-center text-white hover:bg-transparent hover:text-primary border-2 border-primary rounded shadow-[0_2px_2px_0_rgba(0,0,0,0.2)]"
                onClick={() => submit(workday)}
              >
                Speichern
              </button>
              {workday.id && (
                <button
                  className="sm:text-sm text-xs font-medium items-center justify-center bg-primary px-1.5 py-4 text-center text-white hover:bg-transparent hover:text-primary border-2 border-primary rounded shadow-[0_2px_2px_0_rgba(0,0,0,0.2)]"
                  onClick={() => {
                    if (
                      window.confirm(
                        `Möchten Sie den Arbeitstag mit den zugehörigen Aufgaben wirklich löschen?`,
                      )
                    ) {
                      remove(workday);
                    }
                  }}
                >
                  Löschen
                </button>
              )}
            </div>
          </div>
        </div>
        <TimeRecordEdit
          key={timeRecordEditKey()}
          workdayId={workday?.id}
          timeRecord={timeRecord}
          availableTasks={availableTasks}
          onSaved={reload}
          onNew={resetTimeRecord} />
      </div>
    </div>
  );
}
