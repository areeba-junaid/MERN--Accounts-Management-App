import React, { useEffect, useState } from 'react';
import "./transaction.css";
import axios from 'axios';
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';

export function Transaction() {
  const [data, setData] = useState([]);
  const columns = [
    {
      Header: 'Date',
      accessor: 'date',
      Cell: ({ value }) => <div style={{ textAlign: 'center' }}>{value}</div>,
    },
    {
      Header: 'Flag',
      accessor: 'entry',
      Cell: ({ value }) => (
        <div style={{ textAlign: 'center' }}>{value ? 'Adjusted' : 'Normal'}</div>),
    },
    {
      Header: 'Debit Account',
      accessor: 'debitAccountName',
      Cell: ({ value }) => <div style={{ textAlign: 'center' }}>{value}</div>,
    },
    {
      Header: 'Credit Account',
      accessor: 'creditAccountName',
      Cell: ({ value }) => <div style={{ textAlign: 'center' }}>{value}</div>,

    },
    {
      Header: 'Amount',
      accessor: 'amount',
      Cell: ({ value }) => <div style={{ textAlign: 'center' }}>{value}</div>,
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/transaction/get');
        setData(response.data);
        console.log(data)
      } catch (error) {
        console.log('Error from show Transaction', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <h1 className="tran-heading">Transaction/General journal</h1>
      <div className="tran-container">
        <div>
          {data.length > 0 && (
            <ReactTable
              data={data}
              columns={columns}
              defaultPageSize={10}
              pageSizeOptions={[10, 15, 20]}
              keyExtractor={(item) => item.id} // Replace "id" with the unique identifier for each row
            />
          )}
        </div>
      </div>
    </>
  );
}

export default Transaction;
