import { useCallback, useState } from 'react'
import './App.css'
import { DataForm } from './components/DataForm'
import { Result } from './components/Result'
import dayjs from 'dayjs'

export type TDataRecord = {
  date: dayjs.Dayjs;
  range: number;
}

function App() {
  const [tableData, setTableData] = useState<TDataRecord[]>([]);

  const dataFormHandler = useCallback((data: TDataRecord) => {
    const { date, range } = data;
    const existingRecordIndex = tableData.findIndex(record => record.date.isSame(date, 'date'));

    if (existingRecordIndex > -1) {
      const updatedTableData = [...tableData];
      updatedTableData[existingRecordIndex].range += range;
      setTableData(updatedTableData);
    } else {
      const newData = {
        id: Date.now(),
        date,
        range,
      };
      const updatedTableData = [...tableData, newData];
      updatedTableData.sort((a, b) => b.date.diff(a.date));
      setTableData(updatedTableData);
    }
  }, [tableData, setTableData]);

  const handleDelete = (date: dayjs.Dayjs) => {
    const updatedTableData = tableData.filter(record => !record.date.isSame(date, 'date'));
    setTableData(updatedTableData);
  };

  return (
    <>
      <DataForm dataSetter={dataFormHandler} />
      <Result data={tableData} onDelete={handleDelete} />
    </>
  )
}

export default App
