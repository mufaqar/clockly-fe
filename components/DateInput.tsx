interface Props {
  id?: string;
  name: string;
  value: string | null;
  handleChange: (value: string) => void;
}

export default function DateInput({ id, name, value, handleChange }: Props) {
  return (
    <input
      id={id ? id : name}
      type="date"
      name={name}
      value={value || ''}
      onChange={(e) => {
        handleChange(e.target.value);
      }}
    />
  );
}

export function setDate(date: Date, dateString: string) {
  if (dateString) {
    const [yyyy, mm, dd] = dateString.split('-').map((s) => +s);
    const clonedDate = new Date(date);
    clonedDate.setFullYear(yyyy, mm - 1, dd);
    return clonedDate;
  }
  return date;
}
