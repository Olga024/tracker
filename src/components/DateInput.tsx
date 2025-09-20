import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

export default function DateInput({ onChange }: { onChange: (date: string) => void }) {
    const [value, setValue] = React.useState(dayjs());

    const handleChange = (newValue: dayjs.Dayjs | null) => {
        if (newValue) {
            const formattedDate = newValue.format('DD.MM.YYYY');
            onChange(formattedDate);
            setValue(newValue)
        }
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                label="Дата (ДД.ММ.ГГ)"
                value={value}
                onChange={handleChange}
                format="DD.MM.YYYY"
            />
        </LocalizationProvider>
    );
}