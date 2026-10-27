import React, { useState } from "react";
import { Avatar } from "@material-ui/core";
import {
  getImgSrc,
  getCapitalize,
  getIntial,
  currentCurrency,
} from "../../../utils";
import { NumericFormat } from "react-number-format";
import Transactions from "./ViewStudentPayment";

function ViewStudent({
  id,
  transactions,
  user,
  feetype,
  total,
  totalBill,
  balance,
  scholarship,
}) {
  const [open, setOpen] = useState(false);

  const name =
    getCapitalize(user?.name) +
    " " +
    getIntial(user?.middlename || " ") +
    getCapitalize(user?.surname);

  return (
    <div className="content__container">
      {/* HEADER */}
      <div
        style={{ background: "#ffa201" }}
        className="d-flex flex-column align-items-center p-3 text-light mb-4"
      >
        <Avatar
          src={getImgSrc(user?.profileUrl)}
          style={{ width: "100px", height: "100px" }}
        />
        <h3>{name}</h3>
        <h5>{id}</h5>
        <h6>
          {getCapitalize(user?.status)} - {getCapitalize(user?.fees)}
        </h6>

        <button onClick={() => setOpen(true)} className="btn blue__btn">
          View Transactions
        </button>
      </div>

      {/* FEES TABLE */}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Fees</th>
            <th>Amount {currentCurrency()}</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Tuition Fee</td>
            <td>
              <NumericFormat
                value={feetype?.tution}
                displayType="text"
                thousandSeparator
              />
            </td>
          </tr>

          <tr>
            <td>Maintenance Fee</td>
            <td>
              <NumericFormat
                value={feetype?.maintenance}
                displayType="text"
                thousandSeparator
              />
            </td>
          </tr>

          <tr>
            <td>Facility Fee</td>
            <td>
              <NumericFormat
                value={feetype?.facility}
                displayType="text"
                thousandSeparator
              />
            </td>
          </tr>

          <tr>
            <td>Exams Fee</td>
            <td>
              <NumericFormat
                value={feetype?.exam}
                displayType="text"
                thousandSeparator
              />
            </td>
          </tr>

          <tr>
            <td><strong>TOTAL BILL</strong></td>
            <td>
              <NumericFormat
                value={totalBill}
                displayType="text"
                thousandSeparator
              />
            </td>
          </tr>

          {scholarship && (
            <tr>
              <td>
                SCHOLARSHIP: {scholarship?.name} - {scholarship?.percentage}%
              </td>
              <td>
                <NumericFormat
                  value={(Number(scholarship?.percentage) / 100) * totalBill}
                  displayType="text"
                  thousandSeparator
                />
              </td>
            </tr>
          )}

          <tr>
            <td>TOTAL PAID</td>
            <td>
              <NumericFormat
                value={total}
                displayType="text"
                thousandSeparator
              />
            </td>
          </tr>

          <tr>
            <td><strong>BALANCE</strong></td>
            <td>
              <strong>
                <NumericFormat
                  value={balance}
                  displayType="text"
                  thousandSeparator
                />
              </strong>
            </td>
          </tr>
        </tbody>
      </table>

      {/* TRANSACTIONS MODAL */}
      <Transactions
        open={open}
        setOpen={setOpen}
        name={name}
        totalBill={totalBill}
        totalPaid={total}
        balance={balance}
        transactions={transactions}
      />
    </div>
  );
}

export default ViewStudent;
