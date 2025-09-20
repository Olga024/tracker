import { useState } from 'react'
import './App.css'
import { DataForm } from './components/DataForm'
import { Result } from './components/Result'

export type TDataRecord = {
  id: number;
  date: string;
  range: number;
}

function App() {
  const [tableData, setTableData] = useState<TDataRecord[]>([]);

  const dataFormHandler = (data: TDataRecord) => {

    const { date, range } = data;
    const existingRecordIndex = tableData.findIndex(record => record.date === date);

    if (existingRecordIndex !== -1) {

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
      updatedTableData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      setTableData(updatedTableData);
    }
  };

  const handleDelete = (id: number) => {
    const updatedTableData = tableData.filter(record => record.id !== id);
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
