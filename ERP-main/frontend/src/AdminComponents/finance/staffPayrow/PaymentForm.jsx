import React from "react";
import { useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { monthYear } from "../../../data";
import { currentCurrency } from "../../../utils";

function PaymentForm({
  month,
  amount,
  setamount,
  remarks,
  setremarks,
  loading,
  handlePayement,
  balance,
  date,
  setdate,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div className="content__container">
      <form>
        {/* AMOUNT */}
        <div className="row mb-4">
          <label className="col-sm-3 col-form-label">Amount</label>
          <div className="col-sm-9">
            <div className="d-flex justify-content-between mb-2">
              <strong className="text-info">
                Salary Due&nbsp;
                <NumericFormat
                  value={balance}
                  displayType="text"
                  thousandSeparator
                  prefix={currentCurrency()}
                />
              </strong>

              <button
                type="button"
                onClick={() => setamount(balance)}
                className="btn blue__btn"
              >
                Pay All
              </button>
            </div>

            <input
              type="number"
              className="form-control"
              {...register("amount", {
                required: true,
                max: balance,
              })}
              value={amount}
              onChange={(e) => setamount(e.target.value)}
            />

            {errors.amount && (
              <div className="text-danger">
                Amount is required and should not exceed {balance}
              </div>
            )}
          </div>
        </div>

        {/* DATE */}
        <div className="row mb-4">
          <label className="col-sm-3 col-form-label">Date Paid</label>
          <div className="col-sm-9">
            <input
              type="date"
              className="form-control"
              {...register("date", { required: true })}
              value={date}
              onChange={(e) => setdate(e.target.value)}
            />

            {errors.date && (
              <div className="text-danger">This field is required</div>
            )}
          </div>
        </div>

        {/* MONTH */}
        <div className="row mb-4">
          <label className="col-sm-3 col-form-label">Month</label>
          <div className="col-sm-9">
            <input
              type="text"
              className="form-control"
              value={monthYear[month].name}
              readOnly
            />
          </div>
        </div>

        {/* REMARKS */}
        <div className="row mb-4">
          <label className="col-sm-3 col-form-label">Remarks</label>
          <div className="col-sm-9">
            <textarea
              rows={5}
              className="form-control"
              value={remarks}
              onChange={(e) => setremarks(e.target.value)}
            />
          </div>
        </div>

        {/* SUBMIT */}
        <div className="row mb-4">
          <div className="col-sm-9 offset-sm-3">
            <button
              disabled={loading}
              onClick={handleSubmit(handlePayement)}
              className="btn blue__btn"
            >
              {loading && (
                <span className="spinner-border spinner-border-sm me-2"></span>
              )}
              Record Payment
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default PaymentForm;
