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
  start: '',
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
    <div className="bg-card shadow-[0_8px_10px_1px_rgba(0,0,0,0.14)] rounded-lg sm:p-8 p-5">
      <h2 className='md:text-2xl text-xl font-normal sm:text-foreground/85 text-primary mb-5'>
        Arbeitstag
      </h2>

      <div className="grid sm:grid-cols-5 gap-4 grid-cols-4">
        <div className="sm:col-span-3 col-span-4 order-1">
          <label
            htmlFor="task"
            className="flex items-center text-xs font-normal leading-6 text-foreground mb-[-13px] ml-3.5 bg-card px-1.5 w-fit z-10 relative"
          >
            Aufgabe
          </label>
          <select
            className='text-base w-full rounded border-[1.5px] bg-transparent px-3.5 py-[15px] font-normal outline-none transition focus:border-primary active:border-primary'
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
        <div className="sm:col-span-2 col-span-2 sm:order-2 order-3">
          <label
            htmlFor="duration"
            className="flex items-center text-xs font-normal leading-6 text-foreground mb-[-13px] ml-3.5 bg-card px-1.5 w-fit z-10 relative"
          >
            Dauer
          </label>
          <DurationInput
            name="duration"
            value={timeRec.duration}
            handleChange={(value) => handleChange('duration', value)}
          />
        </div>
        <div className="sm:col-span-3 col-span-4 sm:order-3 order-2">
          <label
            htmlFor="description"
            className="flex items-center text-xs font-normal leading-6 text-foreground mb-[-13px] ml-3.5 bg-card px-1.5 w-fit z-10 relative"
          >
            Beschreibung
          </label>
          <textarea
            className='text-base w-full rounded border-[1.5px] bg-transparent px-3.5 py-[15px] font-normal outline-none transition focus:border-primary active:border-primary'
            id="description"
            rows={4}
            value={timeRec.description}
            onChange={(e) => handleChange('description', e.target.value)}
          />
        </div>
        <div className="sm:col-span-2 col-span-2 order-4 flex sm:flex-row flex-row gap-3  justify-end sm:items-end sm:pt-0 pt-3">
          <button
            className="sm:text-sm text-xs font-medium uppercase items-center justify-center bg-primary px-1.5 py-4 text-center text-white hover:bg-transparent hover:text-primary border-2 border-primary rounded shadow-[0_2px_2px_0_rgba(0,0,0,0.2)]"
            disabled={!workdayId}
            onClick={() => submit(timeRec)}
          >
            Speichern
          </button>
          {/* <button
            className="sm:text-sm text-xs font-medium items-center justify-center bg-primary px-1.5 py-4 text-center text-white hover:bg-transparent hover:text-primary border-2 border-primary rounded shadow-[0_2px_2px_0_rgba(0,0,0,0.2)]"
            disabled={!workdayId}
            onClick={onNew}
          >
            Neu
          </button> */}
        </div>
      </div>
    </div>
  );
}
