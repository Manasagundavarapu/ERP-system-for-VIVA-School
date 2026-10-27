import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { selectClasses } from "../../store/slices/schoolSlice";
import { staffPosition } from "../../data";
import axios from "../../store/axios";

function AddMemberCanteeForm(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {
    userID,
    loading,
    role,
    setuserID,
    name,
    setname,
    classID,
    setclass,
    setpaymentPackage,
    onCreate,
  } = props;

  const classes = useSelector(selectClasses);
  const [paymentPlan, setpaymentPlan] = useState([]);

  useEffect(() => {
    axios.get("/api/paymentplan").then((res) => {
      setpaymentPlan(res.data?.plans || []);
    });
  }, []);

  return (
    <form className="g-3" onSubmit={handleSubmit(onCreate)}>
      {/* User ID */}
      <div className="col-md-8 mb-3">
        <label className="form-label">
          {role === "student" ? "Student ID" : "Staff ID"}
        </label>
        <input
          type="text"
          className="form-control"
          value={userID}
          {...register("userID", { required: true })}
          onChange={(e) => setuserID(e.target.value)}
        />
        {errors.userID && (
          <span className="text-danger">This field is required</span>
        )}
      </div>

      {/* Name */}
      <div className="col-md-8 mb-3">
        <label className="form-label">Full Name</label>
        <input
          type="text"
          className="form-control"
          value={name}
          {...register("name", { required: true })}
          onChange={(e) => setname(e.target.value)}
        />
        {errors.name && (
          <span className="text-danger">This field is required</span>
        )}
      </div>

      {/* Class / Position */}
      <div className="col-md-8 mb-3">
        {role === "student" ? (
          <>
            <label className="form-label">Class</label>
            <select
              className="form-select"
              value={classID}
              {...register("classID", { required: true })}
              onChange={(e) => setclass(e.target.value)}
            >
              <option hidden value="">
                Choose...
              </option>
              {classes?.length > 0 ? (
                classes.map((e) => (
                  <option key={e.classCode} value={e.classCode}>
                    {e.name}
                  </option>
                ))
              ) : (
                <option disabled>No classes yet</option>
              )}
            </select>
          </>
        ) : (
          <>
            <label className="form-label">Staff Position</label>
            <select
              className="form-select"
              value={classID}
              onChange={(e) => setclass(e.target.value)}
            >
              <option hidden value="">
                Choose...
              </option>
              {staffPosition.map((e) => (
                <option key={e} value={e}>
                  {e}
                </option>
              ))}
            </select>
          </>
        )}
      </div>

      {/* Payment Plan */}
      <div className="col-md-8 mb-3">
        <label className="form-label">
          Select Payment Plan{" "}
          <a href="/canteen/payments/plan">View Payment Plans</a>
        </label>
        <select
          className="form-select"
          onChange={(e) => setpaymentPackage(e.target.value)}
        >
          <option hidden value="">
            Choose...
          </option>
          {paymentPlan.length > 0 ? (
            paymentPlan.map((e) => (
              <option key={e._id} value={e.plan}>
                {e.name}
              </option>
            ))
          ) : (
            <option disabled>No data yet</option>
          )}
        </select>
      </div>

      {/* Submit */}
      <div className="mb-3">
        <button
          type="submit"
          disabled={loading}
          className="btn blue__btn"
        >
          {loading && (
            <span className="spinner-border spinner-border-sm me-2" />
          )}
          Register
        </button>
      </div>
    </form>
  );
}

export default AddMemberCanteeForm;
