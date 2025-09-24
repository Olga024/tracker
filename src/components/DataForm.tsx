import {Box, Button, TextField} from "@mui/material";
import type {TDataRecord} from "../App";
import {useCallback, useState} from "react";
import DateInput from "./DateInput";
import dayjs from "dayjs";

export type TDataFormProps = {
    dataSetter: (data: TDataRecord) => void;
};

export const DataForm = ({dataSetter}: TDataFormProps) => {
    const [date, setDate] = useState<dayjs.Dayjs>(dayjs());
    const [range, setRange] = useState(0);

    const handleSubmit = useCallback((e: React.FormEvent) => {
        e.preventDefault();
        if (date && range > 0) {
            dataSetter({
                date,
                range,
            });
            setDate(dayjs());
            setRange(0);
        }
    }, [date, range, dataSetter]);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
            }}
        >
            <DateInput onChange={setDate} value={date}/>
            <TextField
                id="outlined-basic"
                label="Пройдено км"
                variant="outlined"
                value={range}
                onChange={(e) => setRange(parseFloat(e.target.value))}
                InputProps={{
                    inputProps: {min: 0, step: 0.1},
                }}
            />
            <Button variant="outlined" onClick={handleSubmit}>OK</Button>
        </Box>
    );
};