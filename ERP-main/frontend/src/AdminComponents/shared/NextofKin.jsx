import React from "react";

function NextofKin(props) {
  const {
    lastname,
    setlastname,
    name,
    setname,
    errors,
    register,
    telephone,
    settelephone,
    email,
    setemail,
    setaddress,
    address,
    occupation,
    setoccupation,
    relationship,
    setrelationship,
  } = props;

  return (
    <div>
      <h3>Next of Kin Information</h3>

      <div className="row mb-3">
        <div className="col-sm-6">
          <label className="form-label">Name</label>
          <input
            type="text"
            value={name}
            {...register("nextname", { required: true })}
            onChange={(e) => setname(e.target.value)}
            className="form-control"
          />
          {errors?.nextname && (
            <span className="text-danger">Name is required</span>
          )}
        </div>

        <div className="col-sm-6">
          <label className="form-label">Last Name</label>
          <input
            type="text"
            value={lastname}
            {...register("nextlastname", { required: true })}
            onChange={(e) => setlastname(e.target.value)}
            className="form-control"
          />
          {errors?.nextlastname && (
            <span className="text-danger">Last name is required</span>
          )}
        </div>

        <div className="col-sm-6">
          <label className="form-label">Mobile Number</label>
          <input
            type="tel"
            value={telephone}
            {...register("nexttel", { required: true })}
            onChange={(e) => settelephone(e.target.value)}
            className="form-control"
          />
          {errors?.nexttel && (
            <span className="text-danger">Mobile number is required</span>
          )}
        </div>

        <div className="col-sm-6">
          <label className="form-label">Email</label>
          <input
            type="email"
            value={email}
            {...register("nextemail")}
            onChange={(e) => setemail(e.target.value)}
            className="form-control"
          />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-sm-6">
          <label className="form-label">Relationship</label>
          <input
            type="text"
            value={relationship}
            {...register("relationship", { required: true })}
            onChange={(e) => setrelationship(e.target.value)}
            className="form-control"
          />
          {errors?.relationship && (
            <span className="text-danger">Relationship is required</span>
          )}
        </div>

        <div className="col-sm-6">
          <label className="form-label">Occupation</label>
          <input
            type="text"
            value={occupation}
            {...register("occupation")}
            onChange={(e) => setoccupation(e.target.value)}
            className="form-control"
          />
        </div>

        <div className="col-sm-6">
          <label className="form-label">Address</label>
          <textarea
            rows={3}
            value={address}
            {...register("address")}
            onChange={(e) => setaddress(e.target.value)}
            className="form-control"
          />
        </div>
      </div>
    </div>
  );
}

export default NextofKin;
