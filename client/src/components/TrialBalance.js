import axios from "axios";
import { useEffect, useState } from "react";
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';

function TrialBalance() {
  const [data, setData] = useState([]);
  const columns = [
    {
      Header: 'Name',
      accessor: 'name',
      Cell: ({ value }) => <div style={{ textAlign: 'center' }}>{value}</div>,
    },
    {
      Header: 'Debit',
      accessor: 'sumDebit',
      Cell: ({ value }) => <div style={{ textAlign: 'center' }}>{value}</div>,
    },
    {
      Header: 'Credit',
      accessor: 'sumCredit',
      Cell: ({ value }) => <div style={{ textAlign: 'center' }}>{value}</div>,
    }
  ];

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/account-info/get")
      .then((res) => {
        console.log("res", res.data);
        setData(res.data);
      })
      .catch((err) => console.log("error from show Income"));
  }, []);
  
  const calculateDebit = () => {
    const debitAccount = data.filter((item) => item.headNo === 1 || item.headNo === 4 || item.headNo === 6);
    const debitTotal = debitAccount.reduce(
      (total, item) => total + item.sumDebit - item.sumCredit,
      0
    );
    return debitTotal;
  };

    const calculateCredit = () => {
      const creditAccount = data.filter((item) => item.headNo === 2 || item.headNo === 3 || item.headNo === 5);
      const totalCredit = creditAccount.reduce(
        (total, item) => total + (item.sumCredit - item.sumDebit),
        0
      );
      return totalCredit;
    };
  const getTrialBalanceData = () => {
    const trialBalanceData = [];

    for (let head = 1; head <= 6; head++) {
      const categoryData = data.filter(item => item.headNo === head);

      for (let i = 0; i < categoryData.length; i++) {
        const item = categoryData[i];

        let debit = 0;
        let credit = 0;

        if (head === 1 || head === 4 || head === 6) {
          debit = item.sumDebit - item.sumCredit;
          credit=false;
        } else {
          credit = item.sumCredit - item.sumDebit;
          debit=false;
        }

        const account = {
          name: item.name,
          sumDebit: debit,
          sumCredit: credit
        };

        trialBalanceData.push(account);
      }
    }

    return trialBalanceData;
  };

  return (
    <>
      <h1 className="tran-heading">Trial Balance</h1>
      <div className="tran-container">
        <div>
          {data.length > 0 && (
            <ReactTable
              data={getTrialBalanceData()}
              columns={columns}
              defaultPageSize={8}
              pageSizeOptions={[10, 15, 20]}
              keyExtractor={(item) => item.id} // Replace "id" with the unique identifier for each row
            />
          )}
        </div>
      </div>
      <div className="total-container">
        <div className="total-column1">
          <h3>Total Debit: </h3>
          <span>${calculateDebit()}</span>
        </div>
        <div className="total-column1">
          <h3>Total Credit: </h3>
          <span>
           ${calculateCredit()}
          </span>
        </div>
      </div>
    </>
  );
}

export default TrialBalance;
