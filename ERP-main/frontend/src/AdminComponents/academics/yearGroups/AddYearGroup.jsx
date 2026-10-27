import React from "react";
import { useForm } from "react-hook-form";
import { getYearsList } from "../../../utils";

export default function AddClassGroup({
  name,
  setname,
  onSubmit,
  loading,
  year,
  setyear,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name,
      year,
    },
  });

  const yearOptions = getYearsList(10);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="content__container">
      <h3>Add Year Group</h3>

      {/* NAME */}
      <div className="mb-3">
        <label className="form-label">Name</label>
        <input
          type="text"
          className="form-control"
          placeholder="eg WASSCE 2016/2015"
          {...register("name", { required: true })}
          onChange={(e) => setname(e.target.value)}
        />
        {errors.name && (
          <span className="text-danger">This field is required</span>
        )}
      </div>

      {/* YEAR */}
      <div className="mb-3">
        <label>Year</label>
        <select
          className="form-select"
          {...register("year", { required: true })}
          onChange={(e) => setyear(e.target.value)}
        >
          <option value="" hidden>
            Select
          </option>
          {yearOptions.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
        {errors.year && (
          <span className="text-danger">This field is required</span>
        )}
      </div>

      {/* BUTTON */}
      <button disabled={loading} type="submit" className="btn blue__btn">
        {loading && (
          <span
            className="spinner-border spinner-border-sm me-2"
            role="status"
            aria-hidden="true"
          />
        )}
        Add
      </button>
    </form>
  );
}
