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
import DateInput, { setDate } from '@/components/DateInput';
import { getAuthOptions } from '@/lib/authOptions';
import { handleError, processResponse } from '@/lib/errorHandling';
import { FaCalendarAlt } from 'react-icons/fa';
import { CiCalendarDate } from 'react-icons/ci';
import { IoCalendarNumberSharp } from 'react-icons/io5';

export interface Workdays {
  list: Workday[];
}

interface Props {
  timestamp: number;
  onSelect: (workday: Workday) => void;
  onDeleted: () => void;
}

export default function WorkdayEdit({ timestamp, onSelect, onDeleted }: Props) {
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
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Erfassung des Arbeitstages
        </h2>
        <p className="text-sm leading-6 text-gray-600">
          Bitte erfassen Sie hier Anfang und Ende des Arbeitstages, sowie die
          Pausenzeit.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <label
          htmlFor="startDate"
          className="flex items-center gap-2 text-sm font-medium leading-6 text-gray-900"
        >
          {workday.id ? (
            <span role="img" aria-label="neu">
              <CiCalendarDate  className='text-2xl'/>
            </span>
          ) : (
            <span role="img" aria-label="gespeichert">
              ✨
            </span>
          )}{' '}
          Arbeitstag
        </label>
        <DateInput
          id="startDate"
          name="start"
          value={
            workday.start ? format(new Date(workday.start), DATE_PATTERN) : null
          }
          handleChange={(value) => {
            const newStartDate = setDate(new Date(workday.start), value);

            setSelectedDate(new Date(newStartDate.setHours(0, 0, 0, 0)));
            handleChange('start', newStartDate.toISOString());
            if (workday.end) {
              handleChange(
                'end',
                setDate(new Date(workday.end), value).toISOString(),
              );
            }
          }}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-3 col-span-1">
          <label
            htmlFor="startTime"
            className="block text-sm font-medium leading-6 text-gray-900"
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
        <div className="flex flex-col gap-3 col-span-1">
          <label
            htmlFor="end"
            className="block text-sm font-medium leading-6 text-gray-900"
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
      </div>

      <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
        <div className="flex flex-col gap-3 col-span-1">
          <label
            htmlFor="workBreak"
            className="block text-sm font-medium leading-6 text-gray-900"
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
            className="sm:text-base text-xs font-medium items-center justify-center bg-primary px-3 py-3 text-center text-white hover:bg-transparent hover:text-primary border-2 border-primary rounded"
            onClick={() => submit(workday)}
          >
            Speichern
          </button>
          {workday.id && (
            <button
              className="sm:text-base text-xs font-medium items-center justify-center bg-primary px-3 py-3 text-center text-white hover:bg-transparent hover:text-primary border-2 border-primary rounded"
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
  );
}
