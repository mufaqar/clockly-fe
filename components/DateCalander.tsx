import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar'; // Renamed child component
import { useState } from 'react';
import DateInput from './DateInput';
// Rename the import or the component name

export default function DateCalendarWrapper() { // Rename the component
    const [value, setValue] = useState<Dayjs | null>(dayjs('2022-03-25'));
    const [selectedDate, setSelectedDate] = useState(
        new Date(new Date().setHours(0, 0, 0, 0)),
    );
    return (
        <>
            <div className='sm:block hidden'>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DateCalendar', 'DateCalendar']}>
                        <DemoItem>
                            <DateCalendar className='bg-white !w-full shadow-[0_8px_10px_1px_rgba(0,0,0,0.14)] rounded-lg sm:p-8 h-full ' value={value} /> {/* Use the renamed child component */}
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

                <DateInput
                    id="startDate"
                    name="start" value={null} handleChange={function (value: string): void {
                        throw new Error('Function not implemented.');
                    }}
                />
            </div>
        </>
    );
}
