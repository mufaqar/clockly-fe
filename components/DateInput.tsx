import { useState } from 'react';
import { LocalizationProvider, DateCalendar } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import dayjs, { Dayjs } from 'dayjs';

interface Props {
  id?: string;
  name: string;
  value: string | null;
  handleChange: (value: string) => void;
}

export default function DateInput({ id, name, value, handleChange }: Props) {
  const defaultValue: Dayjs = value ? dayjs(value) : dayjs(); // Set default value to today if not provided

  const [selectedDate, setSelectedDate] = useState<Dayjs>(defaultValue);

  const handleDateChange = (newDate: Dayjs) => {
    setSelectedDate(newDate);
    handleChange(newDate.toISOString());
  };

  return (
    <div>
      <div className='sm:block hidden'>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DateCalendar', 'DateCalendar']}>
            <DemoItem>
              <DateCalendar
                className='bg-white !w-full rounded-lg sm:p-8 h-full'
                value={selectedDate}
                onChange={handleDateChange}
              />
            </DemoItem>
          </DemoContainer>
        </LocalizationProvider>
      </div>
      <div className='sm:hidden block'>
        <label
          htmlFor="work_day"
          className="flex items-center text-xs font-normal leading-6 text-foreground mb-[-13px] ml-3.5 bg-background px-1.5 w-fit z-10 relative"
        >
          Arbeitstag
        </label>
        <input
          className="text-base w-full rounded border-[1.5px] bg-transparent px-3.5 py-[15px] font-normal outline-none transition focus:border-primary active:border-primary shadow-[0_8px_10px_1px_rgba(0,0,0,0.14)]"
          id={id ? id : name}
          type="date"
          name={name}
          value={value || ''}
          onChange={(e) => {
            handleChange(e.target.value);
            setSelectedDate(dayjs(e.target.value));
          }}
        />
      </div>
    </div>
  );
}
