import { useEffect, useState } from 'react';
import { toHourFormat } from '@/lib/format';

interface Props {
  id?: string;
  name: string;
  value: number | null;
  handleChange: (value: number | null) => void;
}

export default function DurationInput({
  id,
  name,
  value,
  handleChange,
}: Props) {
  const [intermediate, setIntermediate] = useState('');

  useEffect(() => {
    setIntermediate(toHourFormat(value));
  }, [value]);

  return (
    <input
      id={id ? id : name}
      type="time"
      name={name}
      value={intermediate}
      onChange={(e) => {
        setIntermediate(e.target.value);
      }}
      onBlur={() => {
        if (intermediate) {
          const [h, m] = intermediate.split(':').map((s) => +s);
          const value = h + m / 60;
          const rounded = Math.round(value * 4) / 4;
          handleChange(rounded);
        } else {
          handleChange(null);
        }
      }}
    />
  );
}
