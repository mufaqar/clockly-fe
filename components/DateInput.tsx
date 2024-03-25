interface Props {
  id?: string;
  name: string;
  value: string | null;
  handleChange: (value: string) => void;
}

export default function DateInput({ id, name, value, handleChange }: Props) {
  return (
    <input
      className="text-base w-full rounded border-[1.5px] bg-transparent px-3.5 py-[15px] font-normal outline-none transition focus:border-primary active:border-primary shadow-[0_8px_10px_1px_rgba(0,0,0,0.14)]"
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
