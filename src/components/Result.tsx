import { DataGrid } from '@mui/x-data-grid';
import type { TDataRecord } from '../App';
import { Button } from '@mui/material';
import type { GridCellParams, GridColDef } from '@mui/x-data-grid';
import dayjs from 'dayjs';

export type TResultProps = {
    data: TDataRecord[];
    onDelete: (date: dayjs.Dayjs) => void;
};

export const Result = ({ data, onDelete }: TResultProps) => {
    const columns: GridColDef<TDataRecord>[] = [
        { field: 'date', headerName: 'Дата', width: 150, renderCell: ({ row: { date } }) => date.format('DD.MM.YYYY'), },
        { field: 'range', headerName: 'Пройдено км', width: 150 },
        {
            field: 'actions',
            headerName: 'Действия',
            width: 150,
            renderCell: (params: GridCellParams<TDataRecord>) => (
                <Button onClick={() => { onDelete(params?.row?.date) }}>✘</Button>
            ),
        },
    ];

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={data}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 3,
                        },
                    },
                }}
                pageSizeOptions={[5]}
                disableRowSelectionOnClick
            />
        </div>
    );
};