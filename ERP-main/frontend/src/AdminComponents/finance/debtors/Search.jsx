import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import {
  selectYearGroup,
  selectClasses,
} from "../../../store/slices/schoolSlice";

function Search({
  year,
  setyear,
  term,
  setterm,
  classID,
  setclassID,
  handleSearch,
  loading,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const years = useSelector(selectYearGroup);
  const classes = useSelector(selectClasses);

  return (
    <form className="row" onSubmit={handleSubmit(handleSearch)}>
      {/* Academic Year */}
      <div className="col-sm-6 col-mb-4 mb-3">
        <label className="col-form-label">Academic Year</label>
        <select
          className="form-select"
          value={year}
          {...register("year", { required: true })}
          onChange={(e) => setyear(e.target.value)}
        >
          <option hidden value="">
            Choose...
          </option>
          {years?.map((e) => (
            <option key={e.year} value={e.year}>
              {e.year}
            </option>
          ))}
        </select>

        {errors.year && (
          <span className="form-error text-danger">
            This field is required
          </span>
        )}
      </div>

      {/* Term */}
      <div className="col-sm-6 col-mb-4 mb-3">
        <label className="col-form-label">Term</label>
        <select
          className="form-select"
          value={term}
          {...register("term", { required: true })}
          onChange={(e) => setterm(e.target.value)}
        >
          <option hidden value="">
            Choose...
          </option>
          <option value="1">1st</option>
          <option value="2">2nd</option>
          <option value="3">3rd</option>
        </select>
      </div>

      {/* Class */}
      <div className="col-sm-6 col-mb-4 mb-3">
        <label className="col-form-label">Class</label>
        <select
          className="form-select"
          value={classID}
          {...register("classID", { required: true })}
          onChange={(e) => setclassID(e.target.value)}
        >
          <option hidden value="">
            Select
          </option>
          <option value="all">All</option>
          {classes?.map((e) => (
            <option key={e.classCode} value={e.classCode}>
              {e.name}
            </option>
          ))}
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
            <span
              className="spinner-border spinner-border-sm me-2"
              role="status"
            />
          )}
          Search
        </button>
      </div>
    </form>
  );
}

export default Search;
