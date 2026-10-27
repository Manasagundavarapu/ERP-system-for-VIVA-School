import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import axios from "../../../store/axios";
import {
  selectCampuses,
  selectFees,
  selectDivisions,
  selectYearGroup,
} from "../../../store/slices/schoolSlice";
import Checkbox from "@material-ui/core/Checkbox";

function ClassForm(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const campuses = useSelector(selectCampuses);
  const divisions = useSelector(selectDivisions);
  const groups = useSelector(selectFees);
  const years = useSelector(selectYearGroup);

  const [staff, setstaff] = useState([]);
  const [prefects, setprefects] = useState([]);

  const {
    name,
    setname,
    code,
    setcode,
    campus,
    setcampus,
    academic,
    setacademic,
    division,
    setdivision,
    group,
    setgroup,
    prefect,
    setprefect,
    sba,
    setsba,
    sbaStaff,
    setsbaStaff,
    teacher,
    setteacher,
    loading,
    isEdit,
    handleAddClass,
  } = props;

  useEffect(() => {
    axios.get("/api/prefects").then((res) => setprefects(res.data));
  }, []);

  useEffect(() => {
    axios.get("/api/teachers/teachers").then((res) => setstaff(res.data));
  }, []);

  return (
    <form onSubmit={handleSubmit(handleAddClass)}>
      {/* Academic Year */}
      <div className="row mb-3">
        <label className="col-sm-2 col-form-label">Academic Year</label>
        <div className="col-sm-10">
          <select
            className="form-select"
            value={academic}
            onChange={(e) => setacademic(e.target.value)}
          >
            <option hidden>Choose...</option>
            {years.map((e) => (
              <option key={e.year} value={e.year}>
                {e.year}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Class Name */}
      <div className="row mb-3">
        <label className="col-sm-2 col-form-label">Class Name</label>
        <div className="col-sm-10">
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
      </div>

      {/* Class Code */}
      {!isEdit && (
        <div className="row mb-3">
          <label className="col-sm-2 col-form-label">Class Code</label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              value={code}
              {...register("code", { required: true })}
              onChange={(e) => setcode(e.target.value)}
            />
            {errors.code && (
              <span className="text-danger">This field is required</span>
            )}
          </div>
        </div>
      )}

      {/* Campus */}
      <div className="row mb-3">
        <label className="col-sm-2 col-form-label">Campus</label>
        <div className="col-sm-10">
          <select
            className="form-select"
            value={campus}
            onChange={(e) => setcampus(e.target.value)}
          >
            <option hidden>Choose...</option>
            {campuses.map((e) => (
              <option key={e._id} value={e._id}>
                {e.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Group */}
      <div className="row mb-3">
        <label className="col-sm-2 col-form-label">Group</label>
        <div className="col-sm-10">
          <select
            className="form-select"
            value={group}
            onChange={(e) => setgroup(e.target.value)}
          >
            <option hidden>Choose...</option>
            {groups.map((e) => (
              <option key={e._id} value={e._id}>
                {e.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Division */}
      <div className="row mb-3">
        <label className="col-sm-2 col-form-label">Division</label>
        <div className="col-sm-10">
          <select
            className="form-select"
            value={division}
            onChange={(e) => setdivision(e.target.value)}
          >
            <option hidden>Choose...</option>
            {divisions.map((e) => (
              <option key={e._id} value={e.code}>
                {e.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* SBA */}
      <div className="row mb-3">
        <label className="col-sm-2 col-form-label">SBA Configuration</label>
        <div className="col-sm-10">
          <Checkbox
            checked={sba}
            onChange={() => setsba(!sba)}
            color="primary"
          />
        </div>
      </div>

      {/* Submit */}
      <div className="row">
        <div className="offset-sm-2">
          <button disabled={loading} type="submit" className="btn blue__btn">
            {loading && (
              <span className="spinner-border spinner-border-sm me-2" />
            )}
            {isEdit ? "Save Changes" : "Add"}
          </button>
        </div>
      </div>
    </form>
  );
}

export default ClassForm;
