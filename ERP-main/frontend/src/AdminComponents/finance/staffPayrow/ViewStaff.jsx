import React, { useState } from "react";
import { Avatar } from "@material-ui/core";
import {
  getImgSrc,
  getCapitalize,
  getIntial,
  currentCurrency,
} from "../../../utils";
import { NumericFormat } from "react-number-format";
import Transactions from "./Transactions";

function ViewStaff({
  id,
  transactions,
  user,
  feetype,
  total,
  totalBill,
  balance,
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
        <h6>{getCapitalize(user?.position)}</h6>

        <button onClick={() => setOpen(true)} className="btn blue__btn">
          View Transactions
        </button>
      </div>

      {/* PAYROLL TABLE */}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Payroll</th>
            <th>Amount</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Salary</td>
            <td>
              <NumericFormat
                value={feetype?.salary}
                displayType="text"
                thousandSeparator
                prefix={currentCurrency()}
              />
            </td>
          </tr>

          <tr>
            <td>Allowance</td>
            <td>
              <NumericFormat
                value={feetype?.allowance}
                displayType="text"
                thousandSeparator
                prefix={currentCurrency()}
              />
            </td>
          </tr>

          <tr>
            <td>Bonus</td>
            <td>
              <NumericFormat
                value={feetype?.bonus}
                displayType="text"
                thousandSeparator
                prefix={currentCurrency()}
              />
            </td>
          </tr>

          <tr>
            <td><strong>TOTAL SALARY</strong></td>
            <td>
              <strong>
                <NumericFormat
                  value={totalBill}
                  displayType="text"
                  thousandSeparator
                  prefix={currentCurrency()}
                />
              </strong>
            </td>
          </tr>

          <tr>
            <td>TOTAL PAID</td>
            <td>
              <NumericFormat
                value={total}
                displayType="text"
                thousandSeparator
                prefix={currentCurrency()}
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
                  prefix={currentCurrency()}
                />
              </strong>
            </td>
          </tr>
        </tbody>
      </table>

      {/* TRANSACTIONS MODAL */}
      <Transactions
        open={open}
        id={id}
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

export default ViewStaff;
