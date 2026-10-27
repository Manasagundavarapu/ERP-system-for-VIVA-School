import React from "react";
import { useForm } from "react-hook-form";
import Checkbox from "@material-ui/core/Checkbox";

function Form({
  name,
  setname,
  amount,
  setamount,
  handleSetStaff,
  staff,
  handleSelectAll,
  Allstaff,
  onSubmit,
  loading,
  isEdit,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name,
      amount,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* NAME */}
      <div className="mb-3">
        <label className="col-form-label">Name</label>
        <input
          type="text"
          className="form-control"
          {...register("name", { required: true })}
          onChange={(e) => setname(e.target.value)}
        />
        {errors.name && (
          <span className="text-danger">This field is required</span>
        )}
      </div>

      {/* AMOUNT */}
      <div className="mb-3">
        <label className="col-form-label">Amount</label>
        <input
          type="number"
          className="form-control"
          {...register("amount", { required: true })}
          onChange={(e) => setamount(e.target.value)}
        />
        {errors.amount && (
          <span className="text-danger">This field is required</span>
        )}
      </div>

      {/* STAFF SELECTION */}
      <div className="mb-3">
        <label className="col-form-label">Select Staff</label>

        <div className="row">
          <div className="col-9">Select All</div>
          <div className="col-3">
            <Checkbox onChange={handleSelectAll} color="primary" />
          </div>
        </div>

        <hr />

        {Allstaff &&
          Allstaff.map((e, i) => (
            <div key={i} className="row">
              <div className="col-9">
                {e?.name} {e?.surname}
              </div>
              <div className="col-3">
                <Checkbox
                  value={e?.userID}
                  checked={staff.includes(e?.userID)}
                  onChange={handleSetStaff}
                  color="primary"
                />
              </div>
            </div>
          ))}
      </div>

      {/* BUTTON */}
      <button disabled={loading} type="submit" className="btn blue__btn">
        {loading && (
          <span className="spinner-border spinner-border-sm me-2" />
        )}
        {isEdit ? "Save Changes" : "Add"}
      </button>
    </form>
  );
}

export default Form;
