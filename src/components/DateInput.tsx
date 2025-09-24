import * as React from 'react';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

export type TDateInputProps = {
    onChange: (date: dayjs.Dayjs) => void;
    value: dayjs.Dayjs;
}

export default function DateInput({onChange, value}: TDateInputProps) {

    const handleChange = React.useCallback((newValue: dayjs.Dayjs | null) => {
        if (newValue) {
            onChange(newValue);
        }
    }, [onChange]);

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