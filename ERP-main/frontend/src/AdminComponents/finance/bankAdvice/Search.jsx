import React from "react";
import { useForm } from "react-hook-form";
import { monthYear } from "../../../data";

function Search({
  year,
  setyear,
  years,
  month,
  setmonth,
  bank,
  setbank,
  loading,
  onSearch,
  teachers,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      year,
      month,
      bank,
    },
  });

  return (
    <form className="row" onSubmit={handleSubmit(onSearch)}>
      {/* YEAR */}
      <div className="col-sm-3">
        <label className="form-label">Select Year</label>
        <select
          className="form-select"
          {...register("year", { required: true })}
          onChange={(e) => setyear(e.target.value)}
        >
          <option value="" hidden>
            Choose...
          </option>
          {years?.length > 0 ? (
            years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))
          ) : (
            <option disabled>No data yet</option>
          )}
        </select>
        {errors.year && (
          <span className="text-danger">This field is required</span>
        )}
      </div>

      {/* MONTH */}
      <div className="col-sm-3">
        <label className="form-label">Select Month</label>
        <select
          className="form-select"
          {...register("month", { required: true })}
          onChange={(e) => setmonth(e.target.value)}
        >
          <option value="" hidden>
            Choose...
          </option>
          {monthYear?.map((m) => (
            <option key={m.id} value={m.name}>
              {m.name}
            </option>
          ))}
        </select>
        {errors.month && (
          <span className="text-danger">This field is required</span>
        )}
      </div>

      {/* TEACHER */}
      <div className="col-sm-3">
        <label className="form-label">Select Teacher</label>
        <select
          className="form-select"
          {...register("bank", { required: true })}
          onChange={(e) => setbank(e.target.value)}
        >
          <option value="" hidden>
            Choose...
          </option>
          {teachers?.length > 0 ? (
            teachers.map((t) => (
              <option key={t.userID} value={t.userID}>
                {t.userID}
              </option>
            ))
          ) : (
            <option disabled>No data yet</option>
          )}
        </select>
        {errors.bank && (
          <span className="text-danger">This field is required</span>
        )}
      </div>

      {/* BUTTON */}
      <div className="col-sm-3">
        <button
          disabled={loading}
          type="submit"
          className="btn blue__btn mt-4"
        >
          {loading && (
            <span className="spinner-border spinner-border-sm me-2" />
          )}
          Generate Report
        </button>
      </div>
    </form>
  );
}

export default Search;
