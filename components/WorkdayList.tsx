import { useMsal } from '@azure/msal-react';
import { toHourFormat } from '@/lib/format';
import { getAuthOptions } from '@/lib/authOptions';
import { handleError, processResponse } from '@/lib/errorHandling';

export interface Workday {
  id?: string;
  end: string | null;
  start: string;
  workBreak: number | null;
  timeRecords: TimeRecord[];
}

export interface TimeRecord {
  id?: string;
  duration: number | null;
  description: string;
  task: Task;
  start: string;
}

export interface Task {
  id: string;
  name: string;
}

interface Props {
  workday?: Workday;
  onEdit: (timeRecord: TimeRecord) => void;
  onDeleted: () => void;
}

export default function WorkdayList({ workday, onEdit, onDeleted }: Props) {
  const { instance } = useMsal();

  async function remove(timeRecord: TimeRecord) {
    const options = await getAuthOptions(instance);

    await fetch(
      process.env.NEXT_PUBLIC_BASE_URL +
      `/api/users/me/workdays/${workday!.id}/timerecords/${timeRecord.id}`,
      {
        ...options,
        method: 'DELETE',
      },
    )
      .then(processResponse)
      .catch(handleError);

    onDeleted();
  }

  return (
    <div className="relative overflow-x-auto shadow-md mt-8 sm:rounded-[10px] mb-8">
      <table className="w-full text-base font-normal text-left rtl:text-right text-foreground">
        <thead className="text-sm text-white uppercase bg-primary">
          <tr>
            <th className="px-6 py-1">
              Tag
            </th>
            <th className="px-6 py-1">
              Aufgabe
            </th>
            <th className="px-6 py-1">
              Beschreibung
            </th>
            <th className="px-6 py-1">
              Dauer
            </th>
          </tr>
        </thead>
        <tbody>
          {workday?.timeRecords?.map((timeRecord: TimeRecord) => (
            <tr
              key={timeRecord.id}
              className="odd:bg-white even:bg-gray-50 border-b"
            >
              <td className="px-6 py-4">{timeRecord.start}</td>
              <td className="px-6 py-4">{timeRecord.task.name}</td>
              <td className="px-6 py-4">{timeRecord.description}</td>
              <td className="px-6 py-4">{toHourFormat(timeRecord.duration)}</td>
              <td className="px-6 py-4">                
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
