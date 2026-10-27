import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "../../../store/axios";
import { bankOptions } from "../../../data";
import {
  selectCampuses,
  selectDepartments,
} from "../../../store/slices/schoolSlice";
import { Link } from "react-router-dom";

function EmploymentDetails(props) {
  const campuses = useSelector(selectCampuses);
  const departments = useSelector(selectDepartments);
  const [positions, setpositions] = useState([]);

  useEffect(() => {
    axios.get("/api/payrow").then((res) => setpositions(res.data));
  }, []);

  const {
    role,
    setRole,
    department,
    setDepartment,
    campus,
    setCampus,
    employmentDate,
    setemploymentDate,
    qualification,
    setqualification,
    years,
    setyears,
    bank,
    setbank,
    accountNumber,
    setaccountNumber,
    register,
    errors,
    salary,
    setsalary,
    allowance,
    setallowance,
    ssnit,
    setssnit,
    taxNumber,
    settaxNumber,
  } = props;

  return (
    <div>
      <h3>Employment Details</h3>

      <div className="row mb-3">
        <div className="col-sm-6 mb-3">
          <div className="d-flex justify-content-between">
            <label className="form-label">Staff Role</label>
            <Link to="/finance/payrow">Add New Roles</Link>
          </div>

          <select
            className="form-select"
            value={role}
            {...register("role", { required: true })}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="">Select</option>
            {positions.map((p) => (
              <option key={p._id} value={p.code}>
                {p.name}
              </option>
            ))}
          </select>

          {errors?.role && (
            <span className="text-danger">Role is required</span>
          )}
        </div>

        <div className="col-sm-6 mb-3">
          <label className="form-label">Department</label>
          <select
            className="form-select"
            value={department}
            {...register("department")}
            onChange={(e) => setDepartment(e.target.value)}
          >
            <option value="">Select</option>
            {departments.map((d) => (
              <option key={d._id} value={d.code}>
                {d.name}
              </option>
            ))}
          </select>
        </div>

        <div className="col-sm-6 mb-3">
          <label className="form-label">Campus</label>
          <select
            className="form-select"
            value={campus}
            {...register("campus")}
            onChange={(e) => setCampus(e.target.value)}
          >
            <option value="">Select</option>
            {campuses.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="col-sm-6 mb-3">
          <label className="form-label">Employment Date</label>
          <input
            type="date"
            className="form-control"
            value={employmentDate}
            {...register("employmentDate")}
            onChange={(e) => setemploymentDate(e.target.value)}
          />
        </div>

        <div className="col-sm-6 mb-3">
          <label className="form-label">Bank</label>
          <select
            className="form-select"
            value={bank}
            {...register("bank")}
            onChange={(e) => setbank(e.target.value)}
          >
            <option value="">Select</option>
            {bankOptions.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>

        <div className="col-sm-6 mb-3">
          <label className="form-label">Account Number</label>
          <input
            type="text"
            className="form-control"
            value={accountNumber}
            {...register("accountNumber")}
            onChange={(e) => setaccountNumber(e.target.value)}
          />
        </div>

        <div className="col-sm-6 mb-3">
          <label className="form-label">SSNIT Contributor</label>
          <input
            type="checkbox"
            checked={ssnit}
            onChange={() => setssnit(!ssnit)}
          />
        </div>

        {ssnit && (
          <div className="col-sm-6 mb-3">
            <label className="form-label">Tax Number</label>
            <input
              type="text"
              className="form-control"
              value={taxNumber}
              {...register("taxNumber")}
              onChange={(e) => settaxNumber(e.target.value)}
            />
          </div>
        )}

        <div className="col-sm-6 mb-3">
          <label className="form-label">Qualification</label>
          <input
            type="text"
            className="form-control"
            value={qualification}
            {...register("qualification")}
            onChange={(e) => setqualification(e.target.value)}
          />
        </div>

        <div className="col-sm-6 mb-3">
          <label className="form-label">Basic Salary</label>
          <input
            type="number"
            className="form-control"
            value={salary}
            {...register("salary")}
            onChange={(e) => setsalary(e.target.value)}
          />
        </div>

        <div className="col-sm-6 mb-3">
          <label className="form-label">Allowance</label>
          <input
            type="number"
            className="form-control"
            value={allowance}
            {...register("allowance")}
            onChange={(e) => setallowance(e.target.value)}
          />
        </div>

        <div className="col-sm-6 mb-3">
          <label className="form-label">Years with School</label>
          <input
            type="number"
            className="form-control"
            value={years}
            {...register("years")}
            onChange={(e) => setyears(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

export default EmploymentDetails;
