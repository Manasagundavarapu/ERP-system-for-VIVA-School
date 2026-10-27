import React, { useState, useEffect } from "react";
import TableList from "../../AdminComponents/shared/ListTable";
import { selectUser } from "../../store/slices/userSlice";
import { useSelector } from "react-redux";
import axios from "../../store/axios";
import { NumericFormat } from "react-number-format";
import EditIcon from "@material-ui/icons/Edit";
import { monthYear } from "../../data";
import EditBank from "./EditBank";
import { errorAlert, successAlert, currentCurrency } from "../../utils";

const tableHeader = [
  { id: "date", name: "Date" },
  { id: "amount", name: `Amount ${currentCurrency()}` },
  { id: "month", name: "For Month" },
];

const today = new Date();
const currentMonth = today.getMonth();

function Payrow() {
  const [payrowData, setpayrowData] = useState([]);
  const [payrowType, setpayrowType] = useState({});
  const [totalBill, settotalBill] = useState(0);
  const [balance, setbalance] = useState(0);
  const [totalPaid, settotalPaid] = useState(0);
  const [loading, setloading] = useState(false);
  const [editLoading, seteditLoading] = useState(false);
  const [open, setopen] = useState(false);
  const [bank, setbank] = useState("");
  const [accountNumber, setaccountNumber] = useState("");
  const user = useSelector(selectUser);

  useEffect(() => {
    const getdata = async () => {
      setloading(true);

      const transactionData = await axios.get(
        `/api/transactions/staff/pay/${user?.userID}`
      );

      const alltransactions = transactionData.data;

      const monthData = alltransactions.map((e) => ({
        ...e,
        month: monthYear[e.month].name,
      }));

      setpayrowData(monthData);

      const staffData = await axios.get(`/api/teachers/${user?.userID}`);
      const staff = staffData.data?.teacher;

      setaccountNumber(staff?.accountNumber);
      setbank(staff?.bank);

      const payData = await axios.get(`/api/payrow/${staff?.position}`);
      const pay = payData?.data.docs;
      setpayrowType(pay);

      const bill =
        Number(pay?.salary || 0) +
        Number(pay?.allowance || 0) +
        Number(pay?.bonus || 0);

      const monthTrans = alltransactions.filter(
        (e) => Number(e.month) === currentMonth
      );

      const paid = monthTrans.reduce(
        (acc, el) => acc + Number(el.amount || 0),
        0
      );

      settotalBill(bill);
      settotalPaid(paid);
      setbalance(bill - paid);
      setloading(false);
    };

    if (user?.userID) getdata();
  }, [user]);

  const handleEditBank = () => {
    seteditLoading(true);

    axios
      .put(`/api/teachers/update/${user?.id}`, {
        bank,
        accountNumber,
      })
      .then((res) => {
        seteditLoading(false);
        if (res.data.error) {
          errorAlert(res.data.error);
          return;
        }
        successAlert("Changes successfully saved");
        setopen(false);
      })
      .catch(() => {
        seteditLoading(false);
        errorAlert("Changes Failed");
      });
  };

  return (
    <div>
      <div className="row">
        {/* LEFT */}
        <div className="col-sm-6">
          <div className="content__container mb-5">
            <h3>Salary Details</h3>

            <div className="row mb-3">
              <div className="col-sm-4">Position Role:</div>
              <div className="col-sm-8">{payrowType?.name}</div>
            </div>

            {["salary", "allowance", "bonus"].map((key) => (
              <div className="row mb-3" key={key}>
                <div className="col-sm-4">{key.toUpperCase()}:</div>
                <div className="col-sm-8">
                  <NumericFormat
                    value={payrowType?.[key]}
                    displayType="text"
                    thousandSeparator
                    prefix={currentCurrency()}
                  />
                </div>
              </div>
            ))}

            <div className="row mb-3">
              <div className="col-sm-4">Account Number:</div>
              <div className="col-sm-8">{accountNumber}</div>
            </div>

            <div className="row mb-3">
              <div className="col-sm-4">Bank Branch:</div>
              <div className="col-sm-8">
                {bank}
                <button className="btn" onClick={() => setopen(true)}>
                  <EditIcon />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="col-sm-6">
          <div
            style={{ background: "#ffa201" }}
            className="d-flex flex-column align-items-center p-3 text-light mb-4"
          >
            <h3>This Month Pay</h3>

            <table className="table">
              <tbody>
                {[
                  ["SALARY", totalBill],
                  ["PAID", totalPaid],
                  ["DUE PAY", balance],
                ].map(([label, value]) => (
                  <tr key={label}>
                    <td>{label}</td>
                    <td>
                      <NumericFormat
                        value={value}
                        displayType="text"
                        thousandSeparator
                        prefix={currentCurrency()}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <h3>Salary Payments Records</h3>
      <TableList
        data={payrowData}
        loading={loading}
        noActions
        tableHeader={tableHeader}
      />

      <EditBank
        open={open}
        bank={bank}
        loading={editLoading}
        setbank={setbank}
        accountNumber={accountNumber}
        setaccountNumber={setaccountNumber}
        onSubmit={handleEditBank}
        setOpen={setopen}
      />
    </div>
  );
}

export default Payrow;
