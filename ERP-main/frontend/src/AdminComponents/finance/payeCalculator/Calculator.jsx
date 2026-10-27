import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { currentCurrency } from "../../../utils";
import { NumericFormat } from "react-number-format";

function Calculator() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const [salary, setSalary] = useState("");
  const [allowance, setAllowance] = useState("");
  const [ssnit, setSsnit] = useState(false);
  const [loading, setLoading] = useState(false);

  const [tax, setTax] = useState(null);
  const [netTax, setNetTax] = useState("");
  const [balanceBeforeTax, setBalanceBeforeTax] = useState("");
  const [ssnitAmount, setSsnitAmount] = useState("");

  const handleCalculate = () => {
    setLoading(true);

    const total = Number(salary) + Number(allowance);
    const ssnitBalance = 0.135 * total;
    const balance = ssnit ? total - ssnitBalance : total;
    const taxAmount = 0.2 * balance;
    const net = balance - taxAmount;

    setBalanceBeforeTax(total.toFixed(2));
    setSsnitAmount(ssnitBalance.toFixed(2));
    setTax(taxAmount.toFixed(2));
    setNetTax(net.toFixed(2));

    setLoading(false);
  };

  return (
    <div>
      <h3>Paye Calculator</h3>

      <form className="content__container col-md-9 mb-3">
        {/* Salary */}
        <div className="mb-3">
          <label className="col-form-label">Salary</label>
          <input
            type="number"
            className="form-control"
            {...register("salary", { required: true })}
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
          />
          {errors.salary && (
            <span className="text-danger">This field is required</span>
          )}
        </div>

        {/* Allowance */}
        <div className="mb-3">
          <label className="col-form-label">Allowance</label>
          <input
            type="number"
            className="form-control"
            {...register("allowance", { required: true })}
            value={allowance}
            onChange={(e) => setAllowance(e.target.value)}
          />
          {errors.allowance && (
            <span className="text-danger">This field is required</span>
          )}
        </div>

        {/* SSNIT */}
        <div className="mb-3">
          <label className="form-label">Includes SSNIT Contribution</label>
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              checked={ssnit}
              onChange={() => setSsnit(!ssnit)}
            />
          </div>
        </div>

        {/* Button */}
        <button
          type="button"
          onClick={handleSubmit(handleCalculate)}
          className="btn blue__btn"
        >
          {loading && (
            <span className="spinner-border spinner-border-sm me-2"></span>
          )}
          Calculate
        </button>
      </form>

      {/* RESULTS */}
      {netTax && (
        <div className="content__container col-md-9 mb-3">
          <h3>Results</h3>

          <table className="table table-bordered">
            <tbody>
              <tr>
                <td>Total Before Tax</td>
                <td>
                  <NumericFormat
                    value={balanceBeforeTax}
                    displayType="text"
                    thousandSeparator
                    prefix={currentCurrency()}
                  />
                </td>
              </tr>

              {ssnit && (
                <tr>
                  <td>SSNIT Amount</td>
                  <td>
                    <NumericFormat
                      value={ssnitAmount}
                      displayType="text"
                      thousandSeparator
                      prefix={currentCurrency()}
                    />
                  </td>
                </tr>
              )}

              <tr>
                <td>Tax</td>
                <td>
                  <NumericFormat
                    value={tax}
                    displayType="text"
                    thousandSeparator
                    prefix={currentCurrency()}
                  />
                </td>
              </tr>

              <tr>
                <td><strong>Balance After Tax</strong></td>
                <td>
                  <strong>
                    <NumericFormat
                      value={netTax}
                      displayType="text"
                      thousandSeparator
                      prefix={currentCurrency()}
                    />
                  </strong>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Calculator;
