import React from "react";
import { useForm } from "react-hook-form";

function CanteenForm(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {
    studentID,
    setstudentID,
    planPrice,
    amount,
    setamount,
    handleAdd,
    loading,
  } = props;

  return (
    <form className="row g-3" onSubmit={handleSubmit(handleAdd)}>
      {/* Member ID */}
      <div className="col-md-10">
        <label className="form-label">Canteen Member ID</label>
        <input
          type="text"
          className="form-control"
          value={studentID}
          {...register("userID", { required: true })}
          onChange={(e) => setstudentID(e.target.value)}
        />
        {errors.userID && (
          <span className="text-danger">This field is required</span>
        )}
      </div>

      {/* Amount */}
      {planPrice && (
        <div className="col-md-10">
          <label className="form-label">Amount Paid</label>

          {[1, 2, 3].map((e) => (
            <div className="form-check" key={e}>
              <input
                className="form-check-input"
                type="radio"
                value={planPrice * e}
                name="amountRadio"
                onChange={(e) => setamount(e.target.value)}
              />
              <label className="form-check-label">
                {planPrice * e}
              </label>
            </div>
          ))}

          <input
            type="number"
            className="form-control mt-2"
            value={amount}
            readOnly
            {...register("amount", { required: true })}
          />

          {errors.amount && (
            <span className="text-danger">This field is required</span>
          )}
        </div>
      )}

      {/* Submit */}
      <div className="col-xs-12">
        <button
          type="submit"
          disabled={loading}
          className="btn blue__btn"
        >
          {loading && (
            <span className="spinner-border spinner-border-sm me-2" />
          )}
          Add
        </button>
      </div>
    </form>
  );
}

export default CanteenForm;
