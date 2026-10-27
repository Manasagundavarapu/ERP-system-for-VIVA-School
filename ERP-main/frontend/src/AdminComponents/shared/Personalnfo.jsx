import React from "react";
import { getEmailPattern } from "../../utils";

function Personalnfo(props) {
  const {
    name,
    healthCon,
    setHealthCon,
    disease,
    setDisease,
    allerge,
    setallerge,
    setname,
    title,
    setTitle,
    secondName,
    setsecondName,
    lastname,
    setlastname,
    gender,
    setgender,
    dateofBirth,
    setdateofBirth,
    email,
    setemail,
    nationality,
    setnationality,
    placeofBirth,
    setplaceofBirth,
    religion,
    setreligion,
    errors,
    isTeacher,
    register,
  } = props;

  return (
    <div>
      <h3>Personal Information</h3>

      {/* ================= Row 1 ================= */}
      <div className="row mb-3">
        {isTeacher && (
          <div className="col-md-2">
            <label className="form-label">Title</label>
            <select
              className="form-control"
              {...register("title", { required: true })}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            >
              <option value="">Select</option>
              <option value="mr">Mr</option>
              <option value="mrs">Mrs</option>
              <option value="miss">Ms</option>
              <option value="doctor">Dr</option>
              <option value="prof">Prof</option>
            </select>
            {errors?.title && (
              <span className="text-danger">This field is required</span>
            )}
          </div>
        )}

        <div className="col-md-4">
          <label className="form-label">First Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            {...register("name", { required: true })}
            onChange={(e) => setname(e.target.value)}
          />
          {errors?.name && (
            <span className="text-danger">This field is required</span>
          )}
        </div>

        <div className="col-md-4">
          <label className="form-label">Second Name</label>
          <input
            type="text"
            className="form-control"
            value={secondName}
            {...register("secondName")}
            onChange={(e) => setsecondName(e.target.value)}
          />
        </div>

        <div className="col-md-4">
          <label className="form-label">Last Name</label>
          <input
            type="text"
            className="form-control"
            value={lastname}
            {...register("lastname", { required: true })}
            onChange={(e) => setlastname(e.target.value)}
          />
          {errors?.lastname && (
            <span className="text-danger">This field is required</span>
          )}
        </div>
      </div>

      {/* ================= Row 2 ================= */}
      <div className="row mb-3">
        <div className="col-md-4">
          <label className="form-label">Gender</label>
          <select
            className="form-control"
            value={gender}
            {...register("gender", { required: true })}
            onChange={(e) => setgender(e.target.value)}
          >
            <option value="">Select</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="others">Others</option>
          </select>
          {errors?.gender && (
            <span className="text-danger">This field is required</span>
          )}
        </div>

        <div className="col-md-4">
          <label className="form-label">Date of Birth</label>
          <input
            type="date"
            className="form-control"
            value={dateofBirth}
            {...register("dateofBirth", { required: true })}
            onChange={(e) => setdateofBirth(e.target.value)}
          />
        </div>

        <div className="col-md-4">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            {...register("email", {
              required: true,
              pattern: getEmailPattern(),
            })}
            onChange={(e) => setemail(e.target.value)}
          />
          {errors?.email && (
            <span className="text-danger">Valid email is required</span>
          )}
        </div>
      </div>

      {/* ================= Row 3 ================= */}
      <div className="row mb-3">
        <div className="col-md-4">
          <label className="form-label">Nationality</label>
          <input
            type="text"
            className="form-control"
            value={nationality}
            {...register("nationality")}
            onChange={(e) => setnationality(e.target.value)}
          />
        </div>

        <div className="col-md-4">
          <label className="form-label">Religion</label>
          <input
            type="text"
            className="form-control"
            value={religion}
            {...register("religion")}
            onChange={(e) => setreligion(e.target.value)}
          />
        </div>

        <div className="col-md-4">
          <label className="form-label">Place of Birth</label>
          <input
            type="text"
            className="form-control"
            value={placeofBirth}
            {...register("placeofBirth")}
            onChange={(e) => setplaceofBirth(e.target.value)}
          />
        </div>
      </div>

      {/* ================= Row 4 ================= */}
      <div className="row mb-3">
        <div className="col-md-4">
          <label className="form-label">Health Condition</label>
          <select
            className="form-control"
            value={healthCon}
            {...register("healthCon")}
            onChange={(e) => setHealthCon(e.target.value)}
          >
            <option value="">Select</option>
            <option value="vgood">Very Good</option>
            <option value="good">Good</option>
            <option value="fair">Fair</option>
            <option value="critical">Critical</option>
          </select>
        </div>

        <div className="col-md-4">
          <label className="form-label">Disease</label>
          <input
            type="text"
            className="form-control"
            value={disease}
            {...register("disease")}
            onChange={(e) => setDisease(e.target.value)}
          />
        </div>

        <div className="col-md-4">
          <label className="form-label">Allergies</label>
          <input
            type="text"
            className="form-control"
            value={allerge}
            {...register("allergies")}
            onChange={(e) => setallerge(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

export default Personalnfo;
