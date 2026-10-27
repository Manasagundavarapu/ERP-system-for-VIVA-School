import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { studentStatus } from "../../../data";
import {
  selectClasses,
  selectDormitories,
  selectScholarship,
  selectSection,
  selectDivisions,
  selectFees,
  selectCampuses,
} from "../../../store/slices/schoolSlice";

function AcademicsDetails(props) {
  const classes = useSelector(selectClasses);
  const dormitories = useSelector(selectDormitories);
  const scholarship = useSelector(selectScholarship);
  const sections = useSelector(selectSection);
  const campuses = useSelector(selectCampuses);
  const divisions = useSelector(selectDivisions);
  const feesType = useSelector(selectFees);

  const {
    register,
    errors,
    autoID,
    setautoID,
    userID,
    setuserID,
    classID,
    setclass,
    section,
    setsection,
    division,
    setdivision,
    status,
    setstatus,
    dormitory,
    setdormitory,
    schoolarship,
    setschoolarship,
    feesCategory,
    setfeesCategory,
    lastSchool,
    setlastSchool,
    reasonforTransfer,
    setreasonforTransfer,
    isEdit,
    campus,
    setcampus,
  } = props;

  return (
    <div>
      <h3>Academics Details</h3>

      {!isEdit && (
        <div className="row mb-3">
          <div className="col-sm-6">
            <label className="form-label">Auto Generate ID</label>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                checked={autoID}
                onChange={() => setautoID(!autoID)}
              />
            </div>
          </div>

          {!autoID && (
            <div className="col-sm-6">
              <label className="form-label">Student ID</label>
              <input
                type="text"
                className="form-control"
                value={userID}
                onChange={(e) => setuserID(e.target.value)}
              />
            </div>
          )}
        </div>
      )}

      <div className="row mb-3">
        <div className="col-md-4">
          <label className="form-label">Class</label>
          <select
            className="form-select"
            value={classID}
            onChange={(e) => setclass(e.target.value)}
            {...register("class", { required: true })}
          >
            <option hidden>select</option>
            {classes.map((c) => (
              <option key={c.classCode} value={c.classCode}>
                {c.name}
              </option>
            ))}
          </select>
          {errors.class && (
            <span className="text-danger">Class is required</span>
          )}
        </div>

        <div className="col-md-4">
          <label className="form-label">Section / House</label>
          <select
            className="form-select"
            value={section}
            onChange={(e) => setsection(e.target.value)}
          >
            <option hidden>select</option>
            {sections.map((s) => (
              <option key={s._id} value={s._id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-4">
          <label className="form-label">Division</label>
          <select
            className="form-select"
            value={division}
            onChange={(e) => setdivision(e.target.value)}
          >
            <option hidden>select</option>
            {divisions.map((d) => (
              <option key={d._id} value={d._id}>
                {d.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-4">
          <label className="form-label">Status</label>
          <select
            className="form-select"
            value={status}
            onChange={(e) => setstatus(e.target.value)}
            {...register("status", { required: true })}
          >
            <option hidden>select</option>
            {studentStatus.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
          {errors.status && (
            <span className="text-danger">Status is required</span>
          )}
        </div>

        {(status === "border" || status === "freshBorder") && (
          <div className="col-md-4">
            <label className="form-label">Dormitory</label>
            <select
              className="form-select"
              value={dormitory}
              onChange={(e) => setdormitory(e.target.value)}
            >
              <option hidden>select</option>
              {dormitories.map((d) => (
                <option key={d._id} value={d._id}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div className="row mb-3">
        <div className="col-md-4">
          <label className="form-label">Scholarship</label>
          <select
            className="form-select"
            value={schoolarship}
            onChange={(e) => setschoolarship(e.target.value)}
          >
            <option hidden>select</option>
            {scholarship.map((s) => (
              <option key={s._id} value={s._id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-4">
          <label className="form-label">Fees Category</label>
          <select
            className="form-select"
            value={feesCategory}
            onChange={(e) => setfeesCategory(e.target.value)}
          >
            <option hidden>select</option>
            {feesType.map((f) => (
              <option key={f.code} value={f.code}>
                {f.name}
              </option>
            ))}
          </select>
          {!feesType.length && <Link to="/academics/classgroups">Set fees</Link>}
        </div>

        <div className="col-md-4">
          <label className="form-label">Campus</label>
          <select
            className="form-select"
            value={campus}
            onChange={(e) => setcampus(e.target.value)}
          >
            <option hidden>select</option>
            {campuses.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-4">
          <label className="form-label">Last School Attended</label>
          <input
            className="form-control"
            value={lastSchool}
            onChange={(e) => setlastSchool(e.target.value)}
          />
        </div>

        <div className="col-md-4">
          <label className="form-label">Reason for Leaving</label>
          <textarea
            className="form-control"
            rows={4}
            value={reasonforTransfer}
            onChange={(e) => setreasonforTransfer(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

export default AcademicsDetails;
