import { useMsal } from '@azure/msal-react';
import { toHourFormat } from '@/lib/format';
import { getAuthOptions } from '@/lib/authOptions';
import { handleError, processResponse } from '@/lib/errorHandling';

export interface Workday {
  id?: string;
  start: string;
  end: string | null;
  workBreak: number | null;
  timeRecords: TimeRecord[];
}

export interface TimeRecord {
  id?: string;
  duration: number | null;
  description: string;
  task: Task;
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
    <div className="relative overflow-x-auto shadow-md mt-1 sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              Aufgabe
            </th>
            <th scope="col" className="px-6 py-3">
              Beschreibung
            </th>
            <th scope="col" className="px-6 py-3">
              Dauer
            </th>
            <th scope="col" className="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {workday?.timeRecords?.map((timeRecord: TimeRecord) => (
            <tr
              key={timeRecord.id}
              className="odd:bg-white even:bg-gray-50 border-b"
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                {timeRecord.task.name}
              </th>
              <td className="px-6 py-4">{timeRecord.description}</td>
              <td className="px-6 py-4">{toHourFormat(timeRecord.duration)}</td>
              <td className="px-6 py-4">
                <button
                  aria-label="bearbeiten"
                  className="px-1"
                  onClick={() => onEdit(timeRecord)}
                >
                  ✏️
                </button>
                <button
                  aria-label="löschen"
                  className="px-1"
                  onClick={() => {
                    if (
                      window.confirm(
                        `Möchten Sie den Eintrag ${timeRecord.task.name} ${timeRecord.description} wirklich löschen?`,
                      )
                    ) {
                      remove(timeRecord);
                    }
                  }}
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
