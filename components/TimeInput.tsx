import { addDays, format, parse } from 'date-fns';
import { useEffect, useState } from 'react';

interface Props {
  id?: string;
  name: string;
  value: string | null;
  reference: string;
  handleChange: (value: string | null) => void;
}

export default function TimeInput({
  id,
  name,
  value,
  reference,
  handleChange,
}: Props) {
  const HOUR_PATTERN = 'HH:mm';

  const [intermediate, setIntermediate] = useState('');

  useEffect(() => {
    setIntermediate(value ? format(new Date(value), HOUR_PATTERN) : '');
  }, [value]);

  return (
    <input
    className='text-base w-full rounded border-[1.5px] bg-transparent px-5 py-3 font-normal outline-none transition focus:border-primary active:border-primary'
      id={id ? id : name}
      type="time"
      name={name}
      value={intermediate}
      onChange={(e) => {
        setIntermediate(e.target.value);
      }}
      onBlur={(e) => {
        if (intermediate) {
          const [h, m] = intermediate.split(':').map((s) => +s);
          const mm = (Math.round(m / 15) * 15) % 60;
          const hh = m > 52 ? (h + 1) % 24 : h;

          const referenceDate =
            m > 52 && h === 23
              ? addDays(new Date(reference), 1)
              : new Date(reference);
          const newValue = parse(
            `${hh}:${mm}`,
            HOUR_PATTERN,
            referenceDate,
          ).toISOString();

          handleChange(newValue);
        } else {
          handleChange(null);
        }
      }}
    />
  );
}
