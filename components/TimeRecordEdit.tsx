import { useMsal } from '@azure/msal-react';
import { useState } from 'react';
import { Task, TimeRecord } from '@/components/WorkdayList';
import DurationInput from '@/components/DurationInput';
import { getAuthOptions } from '@/lib/authOptions';
import { handleError, processResponse } from '@/lib/errorHandling';

export const defaultTimeRecord: TimeRecord = {
  duration: null,
  description: '',
  task: { id: '', name: '' },
};

interface Props {
  workdayId?: string;
  timeRecord: TimeRecord;
  availableTasks: Task[];
  onSaved: (timeRecord: TimeRecord) => void;
  onNew: () => void;
}

export default function TimeRecordEdit({
  workdayId,
  timeRecord,
  availableTasks,
  onSaved,
  onNew,
}: Props) {
  const { instance } = useMsal();
  const [timeRec, setTimeRec] = useState(timeRecord);

  async function submit(timeRecord: TimeRecord) {
    const options = await getAuthOptions(instance);

    const postHeaders = new Headers(options!.headers);
    postHeaders.append('Content-Type', 'application/json');

    await fetch(
      process.env.NEXT_PUBLIC_BASE_URL +
        `/api/users/me/workdays/${workdayId}/timerecords${timeRecord.id ? `/${timeRecord.id}` : ''}`,
      {
        ...options,
        headers: postHeaders,
        method: timeRecord.id ? 'PUT' : 'POST',
        body: JSON.stringify(timeRecord),
      },
    )
      .then(processResponse)
      .then((timeRecord) => {
        onSaved(timeRecord);
      })
      .catch(handleError);
  }

  function handleChange(name: string, value: any) {
    setTimeRec((timeRecord) => {
      return {
        ...timeRecord,
        [name]: value,
      };
    });
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Erfassung der Aufgabe
        </h2>
        <p className="text-sm leading-6 text-gray-600">
          Bitte erfassen Sie hier eine bearbeitete Aufgabe und die dazugehörige
          Dauer.
        </p>
      </div>

      <div className="grid sm:grid-cols-4 gap-4 grid-cols-1">
        <div className="flex flex-col gap-3 col-span-1 sm:col-span-3">
          <label
            htmlFor="task"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Aufgabe
          </label>
          <select
            id="task"
            name="task"
            value={timeRec.task.id}
            onChange={(e) =>
              handleChange(
                'task',
                availableTasks.find((task) => task.id === e.target.value),
              )
            }
          >
            <option value="">Bitte wählen</option>
            {availableTasks.map((task) => (
              <option key={task.id} value={task.id}>
                {task.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-3 col-span-1">
          <label
            htmlFor="duration"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Dauer
          </label>
          <DurationInput
            name="duration"
            value={timeRec.duration}
            handleChange={(value) => handleChange('duration', value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="flex flex-col gap-3 col-span-3">
          <label
            htmlFor="description"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Beschreibung
          </label>
          <textarea
            id="description"
            rows={4}
            value={timeRec.description}
            onChange={(e) => handleChange('description', e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-3 col-span-1 justify-end items-end">
          <button
            className="hover:bg-sky-500 disabled:hover:bg-sky-700 disabled:text-gray-500"
            disabled={!workdayId}
            onClick={() => submit(timeRec)}
          >
            Speichern
          </button>
          <button
            className="hover:bg-sky-500 disabled:hover:bg-sky-700 disabled:text-gray-500"
            disabled={!workdayId}
            onClick={onNew}
          >
            Neu
          </button>
        </div>
      </div>
    </div>
  );
}
