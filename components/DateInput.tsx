interface Props {
  id?: string;
  name: string;
  value: string | null;
  handleChange: (value: string) => void;
}

export default function DateInput({ id, name, value, handleChange }: Props) {
  return (
    <input
      className="text-base w-full rounded border-[1.5px] bg-transparent px-5 py-3 font-normal outline-none transition focus:border-primary active:border-primary"
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
